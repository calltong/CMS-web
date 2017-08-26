import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import {actions} from '../../../actions/Action';

export default class OrderCondition extends ReducerBase {
  onChange(index) {
    actions.page.order_condition.selectMenu(index);
  }

  onAdd() {
    actions.page.order_condition.addItem();
  }

  onUpItem(index) {
    actions.page.order_condition.upItem(index);
  }

  onRemoveItem(index) {
    actions.page.order_condition.removeItem(index);
  }

  render() {
    let state = store.getState();
    let manage = state.order_condition.manage;
    let doc = state.order_condition.doc;
    let list = doc.data.list.map((item, index) => {
      let name = `เงื่อนไข ${index + 1}`;
      return { name };
    });
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="เงื่อนไขการสั่งซื้อ"
        selected={manage.index}
        onChange={this.onChange} >
        <ButtonContent
          selected={manage.index}
          list={list}
          onChange={this.onChange}
          onUpItem={this.onUpItem}
          onRemoveItem={this.onRemoveItem} />
      </ButtonBase>
    );
  }
}
