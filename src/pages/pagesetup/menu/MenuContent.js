import React from 'react';

import BaseContent from './BaseContent';
import EnButton from '../../../forms/button/EnButton';
import RemoveButton from '../../../forms/button/RemoveButton';
import UpButton from '../../../forms/button/UpButton';
import {actions} from '../../../actions/Action';

export default class MenuContent extends React.Component {
  onChange(index) {
    actions.page.selectPageSubMenu(index);
  }

  onAdd() {
    actions.page.addMenuItem();
  }

  onUpItem(index) {
    actions.page.upMenuItem(index);
  }

  onRemoveItem(index) {
    actions.page.removeMenuItem(index);
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list;
    let menus = list.map((item, index) => {
      return (
        <div key={index}>
          <EnButton
            onClick={this.onChange.bind(this, index)}
            className={index === selected ? 'btn btn-pmenu-selected btn-pmenu-sub-full' : 'btn btn-pmenu btn-pmenu-sub-full'} >
             {item.name}
          </EnButton>
          <UpButton
            onClick={this.onUpItem.bind(this, index)}
            className="pmenu-sub-action" />
          <RemoveButton
            onClick={this.onRemoveItem.bind(this, index)}
            className="pmenu-sub-action" />
        </div>
      );
    });
    return (
      <BaseContent
        onAdd={this.onAdd.bind(this)}
        title="Menu"
        selected={selected} >
        {menus}
      </BaseContent>
    );
  }
}
