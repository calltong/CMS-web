import React from 'react';
import {observer, inject} from 'mobx-react';

import EnButton from '../../forms/button/EnButton';
import EnText from '../../forms/EnText';

export class Login extends React.Component {
  async onLogin() {
    let username = this.refs.username.value();
    let password = this.refs.password.value();
    let result = await this.props.pr_user.login(username, password);
    if (result) {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      this.props.history.push(from);
    }
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleLogin();
    }
  }

  render() {
    let user = this.props.pr_user.toJS();
    return (
      <div className="container-fluid">
        <div className="row" style={{marginTop: '5%'}}>

          <div className="col-md-offset-4 col-md-4">
            <div className="panel panel-login">
              <div className="panel-heading">
                <i className="fa fa-product-hunt"/> Login to Go Shopping
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

export default inject('pr_user')(observer(Login));
