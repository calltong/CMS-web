import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import {actions} from '../../../actions/Action';

export default class HowBuy extends ReducerBase {
  onChange(index) {
    actions.page.how_buy.selectMenu(index);
  }

  onAdd() {
    actions.page.how_buy.addItem();
  }

  onUpItem(index) {
    actions.page.how_buy.upItem(index);
  }

  onRemoveItem(index) {
    actions.page.how_buy.removeItem(index);
  }

  render() {
    let state = store.getState();
    let manage = state.how_buy.manage;
    let doc = state.how_buy.data;
    let list = doc.data.list.map((item, index) => {
      let name = `ขั้นที่ ${index + 1}`;
      return { name };
    });
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="วิธีการสั่งซื้อ"
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
