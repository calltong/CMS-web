import React from 'react';

//import {actions} from '../../actions/Action';
import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import MenuProperty from './property/MenuProperty';

export default class PropertyInfo extends ReducerBase {

  render() {
    let page = store.getState().page;
    let data = page.data;
    let page_menu = page.page_menu;
    let info = (<div />);
    if (page_menu.selected !== undefined) {
      switch (page_menu.selected) {
        case 0:
          info = <MenuProperty selected={page_menu.sub_selected} data={data} />;
          break;
        default:
          info = (<div />);
          break;
      }
    }
    return (
      <div>
        {info}
      </div>
    );
  }
}
