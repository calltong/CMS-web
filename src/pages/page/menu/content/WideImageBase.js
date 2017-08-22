import React from 'react';

import AddButton from '../../../../forms/button/AddButton';

export default class ImageBase extends React.Component {

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
          className={selected === undefined ? 'menu-content-wideimg-selected' : 'menu-content-wideimg'}
          onClick={this.props.onChange}
          role="presentation"
          src={image} />
        <hr style={css}/>
        <div className="page-menu-body">
          {this.props.children}
        </div>
        <hr style={css}/>
        <AddButton className="btn-pmenu-full" onClick={onAdd} />
      </div>
    );
  }
}
