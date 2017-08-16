import React from 'react';

//import {actions} from '../../actions/Action';
import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import MenuProperty from './property/MenuProperty';
import HomeProperty from './property/HomeProperty';
import Footer from './property/Footer';
import AboutUs from './property/AboutUs';
import OrderCondition from './property/OrderCondition';
import ToBuy from './property/ToBuy';

export default class PropertyInfo extends ReducerBase {

  render() {
    let page = store.getState().page;
    let data = page.data;
    let page_menu = page.page_menu;
    let selected = page_menu.selected;
    let info = (<div />);
    if (selected.main !== undefined) {
      switch (selected.main) {
        case 'Menu':
          info = <MenuProperty selected={selected} data={data} />;
          break;
        case 'Home':
          info = <HomeProperty selected={selected} data={data} />;
          break;
        case 'Footer':
          info = <Footer selected={selected} data={data} />;
          break;
        case 'OrderCondition':
          info = <OrderCondition selected={selected} data={data} />;
          break;
        case 'AboutUs':
          info = <AboutUs selected={selected} data={data} />;
          break;
        case 'HowToBuy':
          info = <ToBuy selected={selected} data={data} />;
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
