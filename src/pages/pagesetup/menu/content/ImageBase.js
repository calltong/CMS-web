import React from 'react';

import AddButton from '../../../../forms/button/AddButton';

import {actions} from '../../../../actions/Action';

export default class ImageBase extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  onAdd() {
    //actions.page.addMenuItem();
  }

  render() {
    let css = {
      marginTop: '5px',
      marginBottom: '5px',
    };

    let image = this.props.image;

    let selected = this.props.selected;
    let onAdd = this.props.onAdd;
    if (onAdd === undefined) {
      onAdd = this.onAdd.bind(this);
    }

    return (
      <div>
        <img
          className={selected === undefined ? 'menu-content-img-selected' : 'menu-content-img'}
          onClick={this.onChange.bind(this, undefined)}
          role="presentation"
          src={image} />
        <div className="page-menu-body">
          {this.props.children}
        </div>
        <hr style={css}/>
        <AddButton className="btn-pmenu-full" onClick={onAdd} />
      </div>
    );
  }
}
