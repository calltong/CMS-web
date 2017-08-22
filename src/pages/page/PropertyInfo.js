import React from 'react';

//import {actions} from '../../actions/Action';
import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import MenuProperty from './property/MenuProperty';
import HomeProperty from './property/HomeProperty';
import Footer from './property/Footer';
import AboutUs from './property/AboutUs';
import OrderCondition from './property/OrderCondition';
import HowBuy from './property/HowBuy';

export default class PropertyInfo extends ReducerBase {

  render() {
    let page = store.getState().page;
    let manage = page.manage;
    let selected = manage.selected;
    let info = (<div />);
    if (selected.main !== undefined) {
      switch (selected.main) {
        case 'Menu':
          info = <MenuProperty />;
          break;
        case 'Home':
          info = <HomeProperty />;
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
