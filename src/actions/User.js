import cookie from 'react-cookie';
import {browserHistory} from 'react-router';

//import {store} from '../store';
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
    let params = {username, password};
    let url = `${config.api.url}/user/login`;
    http.put(url, {json: params}, false).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        cookie.save('mtoken', data.token);
        //cookie.save('btoken', `Bearer ${data.token}`);
        browserHistory.push('/Home');
      }
    });
  }

  logout() {
    cookie.remove('mtoken');
    //cookie.remove('btoken');
    browserHistory.push('/Login');
  }
}

export const action = new User();
