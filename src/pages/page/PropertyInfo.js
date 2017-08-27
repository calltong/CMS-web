import React from 'react';

//import {actions} from '../../actions/Action';
import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import Menu from './property/Menu';
import Home from './property/Home';
import Footer from './property/Footer';
import AboutUs from './property/AboutUs';
import OrderCondition from './property/OrderCondition';
import HowBuy from './property/HowBuy';
import Product from './property/Product';
import Payment from './property/Payment';

export default class PropertyInfo extends ReducerBase {

  render() {
    let page = store.getState().page;
    let manage = page.manage;
    let selected = manage.selected;
    let info = (<div />);
    if (selected.main !== undefined) {
      switch (selected.main) {
        case 'Menu':
          info = <Menu />;
          break;
        case 'Home':
          info = <Home />;
          break;
        case 'Footer':
          info = <Footer />;
          break;
        case 'OrderCondition':
          info = <OrderCondition />;
          break;
        case 'AboutUs':
          info = <AboutUs />;
          break;
        case 'HowToBuy':
          info = <HowBuy />;
          break;
        case 'Product':
          info = <Product />;
          break;
        case 'Payment':
          info = <Payment />;
          break;
        default:
          info = (<div />);
          break;
      }
    }
    return (
      <div className="property-body" >
        {info}
      </div>
    );
  }
}
