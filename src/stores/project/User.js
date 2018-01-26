import BaseStore from '../BaseStore';
import {config} from '../../config';
import {http} from '../../utils/http';
import Storage from '../../utils/storage';

let storage = new Storage()
export class User extends BaseStore {
  constructor() {
    super();
    this.observable({
      data: {
        name: '',
      },
      message: '',
      hasAuthenticated: true,
    });
  }

  async verify() {
    let data = storage.readUser();
    let authenticated = false;
    if (data) {
      http.setToken(data.token);
      let params = {token: data.token};
      let url = `${config.api.url}/user/verify/token`;
      let response = await http.put(url, {json: params});
      authenticated = response.statusCode === 200;
      if (authenticated) {
        this.data = data.user;
      }
    }

    this.hasAuthenticated = authenticated;
  }

  async login(username, password) {
    this.message = '';
    let params = {username, password};
    let url = `${config.api.url}/user/login`;
    let response = await http.put(url, {json: params});
    if (response.statusCode === 200) {
      let data = response.body;
      http.setToken(data.token);
      storage.saveUser(data.user, data.token);
      this.hasAuthenticated = true;
      this.data = data.user;
      return true;
    } else {
      this.message = 'username หรือ password ไม่ถูกต้อง';
      return false;
    }
  }

  logout() {
    storage.removeUser();
    this.hasAuthenticated = false;
  }
}

let user = new User();
user.verify();
export default user;
