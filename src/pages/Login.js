import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import cookie from 'react-cookie';

import {config} from '../config';
import {http} from '../utility/http';
import EnButton from '../forms/EnButton';
import EnText from '../forms/EnText';

export class Login extends Component {

  componentDidMount() {
    let token = cookie.load('mtoken');
    if (token) {
      let url = `${config.api.url}/tokenverify`;
      http.put(url, {json: {token: token}}, false).done(response => {
        if (response.statusCode === http.StatusOK) {
          browserHistory.push('/Home');
        }
      });
    }
  }

  onLogin() {
    browserHistory.push('/home');
    let username = this.refs.username.value();
    let password = this.refs.password.value();
    let params = {username, password};
    let url = `${config.api.url}/login`;
    http.put(url, {json: params}, false).done(response => {
      console.log('Login:', response.statusCode);
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        cookie.save('mtoken', data.token);
        cookie.save('btoken', `Bearer ${data.token}`);
        browserHistory.push('/Home');
      }
    });
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleLogin();
    }
  }

  render() {
    let message = 'Login to Content Management System';
    return (
      <div className="container-fluid">
        <div className="row" style={{marginTop: '15%'}}>

          <div className="col-md-offset-4 col-md-4">
            <div className="panel">
              <div className="panel-heading">
                <div className="panel-title">
                  <i className="fa fa-product-hunt"/> {message}
                </div>
              </div>

              <div className="panel-body">
                <div className="form-group">
                  <EnText ref="username" placeholder="username..." onKeyPress={this.onKeyPress.bind(this)}/>
                </div>
                <div className="form-group" style={{marginBottom:4}}>
                  <EnText type="password" ref="password"
                    placeholder="password..." onKeyPress={this.onKeyPress.bind(this)}/>
                </div>
                <EnButton className="btn btn-login pull-right" onClick={this.onLogin.bind(this)}>
                  <i className="fa fa-sign-in"/> Login
                </EnButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
