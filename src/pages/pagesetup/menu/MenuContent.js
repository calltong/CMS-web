import React from 'react';
import EnButton from '../../../forms/EnButton';
import AddButton from '../../../forms/AddButton';
import RemoveButton from '../../../forms/RemoveButton';
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
            className="btn-pmenu-sub-action" />
          <RemoveButton
            onClick={this.onRemoveItem.bind(this, index)}
            className="btn-pmenu-sub-action" />
        </div>
      );
    });
    return (
      <div>
        <EnButton
          className={selected === undefined ? 'btn btn-pmenu-selected btn-pmenu-full' : 'btn btn-pmenu btn-pmenu-full'}
          onClick={this.onChange.bind(this, undefined)} >
          Menu
        </EnButton>

        {menus}

        <AddButton className="btn-pmenu-full" onClick={this.onAdd.bind(this)} />
      </div>
    );
  }
}
