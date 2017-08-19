import React from 'react';

import {ReducerBase} from '../../../ReducerBase';
import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';
import {actions} from '../../../actions/Action';
import {store} from '../../../store';

export default class Menu extends ReducerBase {
  onChange(index) {
    actions.page.menu.selectMenu(index);
  }

  onAdd() {
    actions.page.menu.addItem();
  }

  onUpItem(index) {
    actions.page.menu.upItem(index);
  }

  onRemoveItem(index) {
    actions.page.menu.removeItem(index);
  }

  render() {
    let state = store.getState();
    let manage = state.menu.manage;
    let menu = state.menu.data;
    console.log('menu:', menu);
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="เมนูด้านบน"
        selected={manage.index}
        onChange={this.onChange} >
        <ButtonContent
          selected={manage.index}
          list={menu.data.menu.list}
          onChange={this.onChange}
          onUpItem={this.onUpItem}
          onRemoveItem={this.onRemoveItem}
          />
      </ButtonBase>
    );
  }
}
