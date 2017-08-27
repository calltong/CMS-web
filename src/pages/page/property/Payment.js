import React from 'react';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import Item from './payment/Item';

export default class Payment extends ReducerBase {
  render() {
    let state = store.getState();
    let manage = state.payment.manage;
    let doc = state.payment.doc;
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
