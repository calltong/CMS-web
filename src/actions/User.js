import cookie from 'react-cookie';
import {browserHistory} from 'react-router';

import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

export class User {
  accessRight = false;
  done = false;

  verify(state) {
    let token = cookie.load('mtoken');
    this.done = false;
    this.accessRight = false;
    if (token) {
      let url = `${config.api.url}/user/tokenverify`;
      http.put(url, {json: {token: token}}, false).done(response => {
        this.done = true;
        console.log('verify:', response.statusCode);
        if (response.statusCode === http.StatusOK) {
          this.accessRight = true;
          this.getUser();
        } else {
          browserHistory.push('/Login');
        }
      });
    } else {
      this.done = true;
      browserHistory.push('/Login');
    }

    setTimeout(function() {
      console.log('access:', this.accessRight, ':', this.done);
      if (this.accessRight === false && this.done === false) {
        browserHistory.push('/Login');
      }
    }, 2000); // check again in a second
  }

  login(username, password) {
    store.update('USER_MESSAGE', {data: ''});
    let params = {username, password};
    let url = `${config.api.url}/user/login`;
    http.put(url, {json: params}, false).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        cookie.remove('mtoken');
        cookie.save('mtoken', data.token);
        browserHistory.push('/home');
        this.getUser();
      } else {
        store.update('USER_MESSAGE', {data: 'username หรือ password ไม่ถูกต้อง'});
      }
    });
  }

  getUser() {
    let url = `${config.api.url}/user/get`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        store.update('USER_DATA', {data: data});
      }
    });
  }

  logout() {
    cookie.remove('mtoken');
    browserHistory.push('/login');
  }
}

export const action = new User();
