import React from 'react';
import EnButton from '../../../forms/button/EnButton';
import AddButton from '../../../forms/button/AddButton';

import {actions} from '../../../actions/Action';


export default class BaseContent extends React.Component {
  onChange(index) {
    actions.page.selectPageSubMenu(index);
  }

  onAdd() {
    actions.page.addMenuItem();
  }

  render() {
    let selected = this.props.selected;
    let onAdd = this.props.onAdd;
    if (onAdd === undefined) {
      onAdd = this.onAdd.bind(this);
    }
    return (
      <div>
        <EnButton
          className={selected === undefined ? 'btn btn-pmenu-selected btn-pmenu-full' : 'btn btn-pmenu btn-pmenu-full'}
          onClick={this.onChange.bind(this, undefined)} >
          {this.props.title}
        </EnButton>

        {this.props.children}

        <AddButton className="btn-pmenu-full" onClick={onAdd} />
      </div>
    );
  }
}
