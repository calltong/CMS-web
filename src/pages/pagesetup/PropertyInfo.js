import React from 'react';

//import {actions} from '../../actions/Action';
import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import MenuProperty from './property/MenuProperty';
import HomeProperty from './property/HomeProperty';
import FooterProperty from './property/FooterProperty';

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
          info = <FooterProperty selected={selected} data={data} />;
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
