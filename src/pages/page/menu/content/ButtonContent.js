import React from 'react';

import EnButton from '../../../../forms/button/EnButton';
import RemoveButton from '../../../../forms/button/RemoveButton';
import UpButton from '../../../../forms/button/UpButton';

export default class ButtonContent extends React.Component {
  onChange(index) {
    this.props.onChange(index);
  }

  onAdd() {
    this.props.onAdd();
  }

  onUpItem(index) {
    this.props.onUpItem(index);
  }

  onRemoveItem(index) {
    this.props.onRemoveItem(index);
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list;
    let menus = <div />;

    menus = list.map((item, index) => {
      let btnUp = <div />;
      let btnRemove = <div />;

      if (this.props.onUpItem !== undefined) {
        btnUp = <UpButton
          onClick={this.onUpItem.bind(this, index)}
          className="pmenu-sub-action" />;
      }

      if (this.props.onRemoveItem !== undefined) {
        btnRemove = <RemoveButton
          onClick={this.onRemoveItem.bind(this, index)}
          className="pmenu-sub-action" />;
      }
      return (
        <div key={index}>
          <EnButton
            onClick={this.onChange.bind(this, index)}
            className={index === selected ? 'btn btn-pmenu-selected btn-pmenu-sub-full' : 'btn btn-pmenu btn-pmenu-sub-full'} >
             {item.name}
          </EnButton>

          {btnUp}
          {btnRemove}
        </div>
      );
    });

    return (
      <div>
        {menus}
      </div>
    );
  }
}
