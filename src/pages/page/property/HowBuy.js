import React from 'react';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import Item from './HowBuy/Item';

export default class HowBuy extends ReducerBase {
  render() {
    let state = store.getState();
    let manage = state.how_buy.manage;
    let doc = state.how_buy.data;
    let content = <div />;
    if (manage.index === undefined) {
      content = <div />;
    } else {
      let item = doc.data.list[manage.index];
      content = <Item index={manage.index} data={item} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
