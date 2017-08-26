import React from 'react';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import MainProperty from './menu/MainProperty';
import ItemProperty from './menu/ItemProperty';

export default class Menu extends ReducerBase {
  render() {
    let state = store.getState();
    let manage = state.menu.manage;
    let doc = state.menu.doc;

    let content = <div />;
    if (manage.index === undefined) {
      content = <MainProperty data={doc.data.menu} />;
    } else {
      let item = doc.data.menu.list[manage.index];
      content = <ItemProperty index={manage.index} data={item} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
