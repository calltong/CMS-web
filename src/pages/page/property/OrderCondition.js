import React from 'react';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import Item from './orderCondition/Item';

export default class OrderCondition extends ReducerBase {
  render() {
    let state = store.getState();
    let manage = state.order_condition.manage;
    let doc = state.order_condition.doc;
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
