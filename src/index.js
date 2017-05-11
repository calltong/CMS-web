import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin.css';
import './css/button.css';
import './css/layout.css';
import './css/page.css';
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

import OrderManager from './pages/order/OrderManager';
import OrderInfo from './pages/order/OrderInfo';

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
    }}, 2000); // check again in a second
}

ReactDOM.render((
   <Router history={browserHistory}>
      <Route path="Login" component={Login} />

      <Route path="/" component={App}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="products" component={ProductManagement} />
         <Route path="products/create" component={ProductInfo} />
         <Route path="products/:id" component={ProductInfo} />

         <Route path="orders" component={OrderManager} />
         <Route path="orders/:id" component={OrderInfo} />

      </Route>
   </Router>

), document.getElementById('root'))
