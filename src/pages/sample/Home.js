import React from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import Menu from './Menu';
import Footer from './Footer';
import Builder from './content/Builder';
import HowToBuy from './HowToBuy';
import AboutUs from './AboutUs';
import OrderCondition from './OrderCondition';
import Product from './Product';
import CheckoutPayment from './order/CheckoutPayment';

export class Home extends ReducerBase {
  componentDidMount() {
    actions.page.main.getHowToBuy();
    actions.page.main.getMenu();
  }

  render() {
    let state = store.getState();
    let page = state.page;
    let menu = state.menu.doc;

    let selected = page.manage.selected;
    let body = <div />;
    switch (selected.main) {
      case 'AboutUs':
        body = <AboutUs />;
        break;
      case 'HowToBuy':
        body = <HowToBuy/>;
        break;
      case 'OrderCondition':
        body = <OrderCondition />;
        break;
      case 'Product':
        body = <Product />;
        break;
      case 'Payment':
        body = <CheckoutPayment />;
        break;
      default:
        let home = state.home.doc;
        body = <Builder list={home.data.list} />;
        break;

    }
    return (
      <div>
        <Menu content={menu.data.menu} />
        {body}
        <Footer content={menu.data.footer} />
      </div>
    );
  }
}

export default Home;
