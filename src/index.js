import './assets.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import history from './utils/history';
import mobx from './stores/store.js';

import ScrollToTop from './forms/ScrollToTop';

import App from './pages/App';
import NotFound from './pages/support/404';
import Forbidden from './pages/support/403';
import Login from './pages/support/Login';
/*
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import {config} from './config';
import {actions} from './actions/Action';

import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductManagement from './pages/product/ProductManagement';
import ProductInfo from './pages/product/ProductInfo';

import TypeManager from './pages/type/TypeManager';
import TypeInfo from './pages/type/TypeInfo';

import SizeManager from './pages/size/SizeManager';
import SizeInfo from './pages/size/SizeInfo';

import ColorManager from './pages/color/ColorManager';
import ColorInfo from './pages/color/ColorInfo';

import OrderManager from './pages/order/OrderManager';
import OrderInfo from './pages/order/OrderInfo';
import PageInfo from './pages/page/PageInfo';

config.setup(window.location.host);

function checkAuthentication(state, replace) {
  actions.user.verify(state);
}*/

ReactDOM.render((
  <Provider {...mobx}>
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/403" component={Forbidden} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={App} />
        </Switch>
      </ScrollToTop>
    </Router>
  </Provider>
), document.getElementById('root'));
/*
ReactDOM.render((
   <Router history={browserHistory}>
      <Route path="Login" component={Login} />

      <Route path="/" component={App} onEnter={checkAuthentication}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="product" component={ProductManagement} />
         <Route path="product/create" component={ProductInfo} />
         <Route path="product/:id/edit" component={ProductInfo} />

         <Route path="type" component={TypeManager} />
         <Route path="type/create" component={TypeInfo} />
         <Route path="type/:id/edit" component={TypeInfo} />

         <Route path="size" component={SizeManager} />
         <Route path="size/create" component={SizeInfo} />
         <Route path="size/:id/Edit" component={SizeInfo} />

         <Route path="color" component={ColorManager} />
         <Route path="color/create" component={ColorInfo} />
         <Route path="color/:id/edit" component={ColorInfo} />

         <Route path="page/modify" component={PageInfo} />

         <Route path="order" component={OrderManager} />
         <Route path="order/:id" component={OrderInfo} />
      </Route>
   </Router>)
   , document.getElementById('root'));
   */
