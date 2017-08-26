import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import {actions} from '../../../actions/Action';

export default class AboutUs extends ReducerBase {
  onChange(index) {
    actions.page.about_us.selectMenu(index);
  }

  onAdd() {
    actions.page.about_us.addItem();
  }

  onUpItem(index) {
    actions.page.about_us.upItem(index);
  }

  onRemoveItem(index) {
    actions.page.about_us.removeItem(index);
  }

  render() {
    let state = store.getState();
    let manage = state.about_us.manage;
    let doc = state.about_us.doc;
    let list = doc.data.list.map((item, index) => {
      let name = `สาขา ${index + 1}`;
      return { name };
    });
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="เกี่ยวกับร้าน"
        selected={manage.index}
        onChange={this.onChange} >
        <ButtonContent
          selected={manage.index}
          list={list}
          onChange={this.onChange}
          onUpItem={this.onUpItem}
          onRemoveItem={this.onRemoveItem}
          />
      </ButtonBase>
    );
  }
}
