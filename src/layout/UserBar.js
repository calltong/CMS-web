import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

class UserBar extends Component {
  logout() {
    this.props.pr_user.logout();
  }

  render() {
    let data = this.props.pr_user.toJS().data;
    let css = {visibility: 'none'};
    return (
      <ul className="nav navbar-right">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-user"/> {data.name}<b className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li>
              <a style={css} ><i className="fa fa-fw fa-user"/> Profile</a>
            </li>
            <li>
              <a style={css} ><i className="fa fa-fw fa-envelope"/> Inbox</a>
            </li>
            <li>
              <a style={css} ><i className="fa fa-fw fa-gear"/> Settings</a>
            </li>
            <li className="divider"/>
            <li>
              <a onClick={this.logout.bind(this)}><i className="fa fa-fw fa-power-off"/> Log Out</a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

export default inject('pr_user')(observer(UserBar));
