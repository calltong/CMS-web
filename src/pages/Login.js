import React from 'react';

import EnButton from '../forms/button/EnButton';
import EnText from '../forms/EnText';

import {ReducerBase} from '../ReducerBase';
import {store} from '../store';
import {actions} from '../actions/Action';

export class Login extends ReducerBase {
  onLogin() {
    let username = this.refs.username.value();
    let password = this.refs.password.value();
    actions.user.login(username, password);
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleLogin();
    }
  }

  render() {
    let user = store.getState().user;
    console.log('user:', user);
    let message = 'Login to Go Shopping';
    return (
      <div className="container-fluid">
        <div className="row" style={{marginTop: '5%'}}>

          <div className="col-md-offset-4 col-md-4">
            <div className="panel panel-login">
              <div className="panel-heading">
                <i className="fa fa-product-hunt"/> {message}
              </div>

              <div className="panel-body">

                <div className="form-group">
                  <EnText ref="username" placeholder="username..." onKeyPress={this.onKeyPress.bind(this)}/>
                </div>
                <div className="form-group" style={{marginBottom:4}}>
                  <EnText type="password" ref="password"
                    placeholder="password..." onKeyPress={this.onKeyPress.bind(this)}/>
                </div>
                <div>
                  <p style={{color: '#C60101'}}>{user.message}</p>
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
