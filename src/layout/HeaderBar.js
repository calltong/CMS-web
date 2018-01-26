import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UserBar from './UserBar';

class MenuBar extends Component {
  render() {

    return (
      <ul className="nav navbar-nav">
        <li><Link to={'/home'} ><i className="fa fa-fw fa-dashboard" /> Dashboard</Link></li>
        <li><Link to={'/order'} ><i className="fa fa-fw fa-usd" /> คำสั่งซื้อ</Link></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-fw fa-product-hunt"/> ตั้งค่าสินค้า <b className="caret"/>
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to={'/product/create'} ><i className="fa fa-plus-circle" /> สร้างสินค้า</Link>
            </li>
            <li className="divider"/>
            <li>
              <Link to={'/product'} ><i className="fa fa-list-ul" /> รายการสินค้า</Link>
            </li>
            <li>
              <Link to={'/color'} ><i className="fa fa-list-ul" /> สีสินค้า</Link>
            </li>
            <li>
              <Link to={'/size'} ><i className="fa fa-list-ul" /> ขนาดสินค้า</Link>
            </li>
            <li>
              <Link to={'/type'} ><i className="fa fa-list-ul" /> ชนิดสินค้า</Link>
            </li>
          </ul>
        </li>
        <li><Link to={'/page/modify'} ><i className="fa fa-columns" /> หน้าเวป</Link></li>
        <li><Link to={'/live'} ><i className="fa fa-camera" /> Go Live</Link></li>
      </ul>
    );
  }
}

export default class HeaderBar extends Component {
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
          <Link className="navbar-brand" to="/home">Go Shopping</Link>
        </div>

        <div className="collapse navbar-collapse" id="header-bar">
          <MenuBar />
          <UserBar />
        </div>
      </nav>
    );
  }
}
