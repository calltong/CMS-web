import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';
import {actions} from '../../../actions/Action';

export default class OrderCondition extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  onAdd() {
    actions.orderConditionPage.addItem();
  }

  onUpItem(index) {
    actions.orderConditionPage.upItem(index);
  }

  onRemoveItem(index) {
    actions.orderConditionPage.removeItem(index);
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list.map((item, index) => {
      let name = `เงื่อนไข ${index + 1}`;
      return { name };
    });
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="เงื่อนไขการสั่งซื้อ"
        selected={selected.level_2}
        onChange={this.onChange} >
        <ButtonContent
          selected={selected.level_2}
          list={list}
          onChange={this.onChange}
          onUpItem={this.onUpItem}
          onRemoveItem={this.onRemoveItem}
          />
      </ButtonBase>
    );
  }
}
