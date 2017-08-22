import React from 'react';

import WideImageBase from '../content/WideImageBase';
import RemoveButton from '../../../../forms/button/RemoveButton';
import UpButton from '../../../../forms/button/UpButton';

export default class ImageList extends React.Component {
  onChange(index) {
    this.props.onChange(index);
  }

  onAdd() {
    this.props.onAdd();
  }

  onUpItem(index) {
    this.props.onUp(index);
  }

  onRemoveItem(index) {
    this.props.onRemove(index);
  }

  render() {
    let css = {
      maxWidth: '160px',
      maxHeight: '90px',
    };
    let selected = this.props.selected;
    let list = this.props.data.list;
    let content = list.map((item, index) => {
      return (
        <div key={index}
          className={selected === index ? 'row pmenu-item-row-selected' : 'row pmenu-item-row'}>
          <div className="col-md-8 pmenu-item">
            <img
              style={css}
              onClick={this.onChange.bind(this, index)}
              src={item.preview}
              role="presentation" />
          </div>
          <div className="col-md-4 pmenu-item">
            <UpButton
              onClick={this.onUpItem.bind(this, index)}
              className="pmenu-item-button" />
            <RemoveButton
              onClick={this.onRemoveItem.bind(this, index)}
              className="pmenu-item-button" />
          </div>
        </div>
      );
    });

    return (
      <WideImageBase
        image={this.props.image}
        onChange={this.onChange.bind(this, undefined)}
        onAdd={this.onAdd.bind(this)}
        selected={selected}>
        {content}
      </WideImageBase>
    );
  }
}
