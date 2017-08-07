import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';
import {actions} from '../../../actions/Action';

export default class MenuContent extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  onAdd() {
    actions.menuPage.addItem();
  }

  onUpItem(index) {
    actions.menuPage.upItem(index);
  }

  onRemoveItem(index) {
    actions.menuPage.removeItem(index);
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list;
    return (
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="Menu"
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
