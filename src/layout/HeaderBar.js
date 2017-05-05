import React, { Component } from 'react';
import {Link} from 'react-router'

export class HeaderBar extends Component {

  render() {
    var name = "Seocy";
    return (
      <div>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/Home">{name}</Link>
        </div>
        <ul className="nav navbar-right top-nav">
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> Uthai R.<b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li>
                        <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-fw fa-envelope"></i> Inbox</a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-fw fa-gear"></i> Settings</a>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <a href="#"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
    );
  }
}

export default HeaderBar;
