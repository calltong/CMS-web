import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {observer, inject} from 'mobx-react';

import HeaderBar from '../layout/HeaderBar';
import Home from './Home';

import ProductManager from './product/ProductManager';
import ProductItem from './product/ProductItem';

import ColorManager from './color/ColorManager';
import ColorItem from './color/ColorItem';

import SizeManager from './size/SizeManager';
import SizeItem from './size/SizeItem';

import TypeManager from './type/TypeManager';
import TypeItem from './type/TypeItem';

//import OrderManager from './pages/order/OrderManager';
//import OrderInfo from './pages/order/OrderInfo';
//import PageInfo from './pages/page/PageInfo';

export class App extends Component {
  isAuthenticated() {
    return this.props.pr_user.hasAuthenticated;
  }

  render() {
    if (!this.isAuthenticated()) {
      return <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }}} />;
    } else {
      return (
        <div id="wrapper">
          <HeaderBar active={this.props.location.pathname}/>
          <div id="page-wrapper">
            <Route exact path="/" component={Home} />

            <Route exact path="/product" component={ProductManager} />
            <Route exact path="/product/create" component={ProductItem} />
            <Route exact path="/product/:id/edit" component={ProductItem} />

            <Route exact path="/color" component={ColorManager} />
            <Route exact path="/color/create" component={ColorItem} />
            <Route exact path="/color/:id/edit" component={ColorItem} />

            <Route exact path="/size" component={SizeManager} />
            <Route exact path="/size/create" component={SizeItem} />
            <Route exact path="/size/:id/edit" component={SizeItem} />

            <Route exact path="/type" component={TypeManager} />
            <Route exact path="/type/create" component={TypeItem} />
            <Route exact path="/type/:id/edit" component={TypeItem} />
          </div>
        </div>
      );
    }
  }
}

export default inject('pr_user')(observer(App));
