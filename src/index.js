import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin.css';
import './css/button.css';
import './css/layout.css';
import './css/page.css';
import './css/window.css';
import './css/plugins/morris.css';
import 'font-awesome/css/font-awesome.css';
import 'react-tagsinput/react-tagsinput.css';
import 'sweetalert/dist/sweetalert.css';
import 'react-select2-wrapper/css/select2.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import cookie from 'react-cookie';

import {config} from './config';
import {http} from './utility/http';
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

import PageManager from './pages/pagesetup/PageManager';
import PageInfo from './pages/pagesetup/PageInfo';

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

config.setup(window.location.host);

let accessRight = false;
function checkAuthentication(state, replace) {
  let token = cookie.load('mtoken');
  let done = false;
  accessRight = false;
  if (token) {
    let url = `${config.api.url}/tokenverify`;
    http.put(url, {json: {token: token}}, false).done(response => {
      done = true;
      if (response.statusCode === http.StatusOK) {
        //browserHistory.push('/Home');
        accessRight = true;
      } else {
        browserHistory.push('/Login');
      }
    });
  } else {
    done = true;
    browserHistory.push('/Login');
  }

  setTimeout(function() {
    if (accessRight === false && done === false) {
      browserHistory.push('/Login');
    }
  }, 2000); // check again in a second
}

ReactDOM.render((
   <Router history={browserHistory}>
      <Route path="Login" component={Login} />

      <Route path="/" component={App} onEnter={checkAuthentication}>
         <IndexRoute component={Home} />
         <Route path="Home" component={Home} />
         <Route path="ProductManager" component={ProductManagement} />
         <Route path="ProductManager/Create" component={ProductInfo} />
         <Route path="ProductManager/:id/Edit" component={ProductInfo} />

         <Route path="TypeManager" component={TypeManager} />
         <Route path="TypeManager/Create" component={TypeInfo} />
         <Route path="TypeManager/:id/Edit" component={TypeInfo} />

         <Route path="SizeManager" component={SizeManager} />
         <Route path="SizeManager/Create" component={SizeInfo} />
         <Route path="SizeManager/:id/Edit" component={SizeInfo} />

         <Route path="ColorManager" component={ColorManager} />
         <Route path="ColorManager/Create" component={ColorInfo} />
         <Route path="ColorManager/:id/Edit" component={ColorInfo} />

         <Route path="PageManager" component={PageManager} />
         <Route path="PageManager/Create" component={PageInfo} />
         <Route path="PageManager/:id/Edit" component={PageInfo} />

         <Route path="OrderManager" component={OrderManager} />
         <Route path="OrderManager/:id/Info" component={OrderInfo} />

      </Route>
   </Router>)
   , document.getElementById('root'));
