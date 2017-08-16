import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';
import {actions} from '../../../actions/Action';

export default class ToBuy extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  onAdd() {
    actions.toBuyPage.addItem();
  }

  onUpItem(index) {
    actions.toBuyPage.upItem(index);
  }

  onRemoveItem(index) {
    actions.toBuyPage.removeItem(index);
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list.map((item, index) => {
      let name = `ขั้นที่ ${index + 1}`;
      return { name };
    });
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="วิธีการสั่งซื้อ"
        selected={selected.level_2}
        onChange={this.onChange} >
        <ButtonContent
          selected={selected.level_2}
          list={list}
          onChange={this.onChange}
          onUpItem={this.onUpItem}
          onRemoveItem={this.onRemoveItem} />
      </ButtonBase>
    );
  }
}
