import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';
import {actions} from '../../../actions/Action';

export default class AboutUs extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  onAdd() {
    actions.aboutusPage.addItem();
  }

  onUpItem(index) {
    actions.aboutusPage.upItem(index);
  }

  onRemoveItem(index) {
    actions.aboutusPage.removeItem(index);
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list.map((item, index) => {
      let name = `สาขา ${index + 1}`;
      return { name };
    });
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="เกี่ยวกับร้าน"
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
