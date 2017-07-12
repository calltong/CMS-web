import React, { Component } from 'react';
import {Link} from 'react-router';

class MenuBar extends Component {
  render() {

    return (
      <ul className="nav navbar-nav">
        <li><Link to={'/home'} ><i className="fa fa-fw fa-dashboard" /> Dashboard</Link></li>
        <li><Link to={'/order'} ><i className="fa fa-fw fa-usd" /> Order</Link></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-fw fa-product-hunt"/> Product Setting <b className="caret"/>
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to={'/product/create'} ><i className="fa fa-plus-circle" /> Create Product</Link>
            </li>
            <li className="divider"/>
            <li>
              <Link to={'/product'} ><i className="fa fa-list-ul" /> Product List</Link>
            </li>
            <li>
              <Link to={'/size'} ><i className="fa fa-list-ul" /> Product Size</Link>
            </li>
            <li>
              <Link to={'/type'} ><i className="fa fa-list-ul" /> Product Type</Link>
            </li>
          </ul>
        </li>
        <li><Link to={'/page'} ><i className="fa fa-columns" /> Page</Link></li>
      </ul>
    );
  }
}

class UserBar extends Component {
  render() {

    return (
      <ul className="nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-user"/> Uthai R.<b className="caret"/>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="#"><i className="fa fa-fw fa-user"/> Profile</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-envelope"/> Inbox</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-gear"/> Settings</a>
            </li>
            <li className="divider"/>
            <li>
              <a href="#"><i className="fa fa-fw fa-power-off"/> Log Out</a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

export class HeaderBar extends Component {

  render() {

    return (
      <nav className="navbar navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/home">{name}</Link>
        </div>

        <div className="collapse navbar-collapse" id="header-bar">
          <MenuBar />
          <UserBar />
        </div>
      </nav>
    );
  }
}

export default HeaderBar;
