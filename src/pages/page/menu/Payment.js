import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import {actions} from '../../../actions/Action';

export default class Payment extends ReducerBase {
  onChange(index) {
    actions.page.payment.selectMenu(index);
  }

  onAdd() {
    actions.page.payment.addItem();
  }

  onUpItem(index) {
    actions.page.payment.upItem(index);
  }

  onRemoveItem(index) {
    actions.page.payment.removeItem(index);
  }

  render() {
    let state = store.getState();
    let manage = state.payment.manage;
    let doc = state.payment.doc;
    let list = doc.data.list.map((item, index) => {
      let name = `ธนาคาร ${index + 1}`;
      return { name };
    });
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="ชำระเงิน"
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
