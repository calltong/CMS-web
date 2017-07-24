import React from 'react';

import BaseContent from './BaseContent';
import RemoveButton from '../../../forms/button/RemoveButton';
import UpButton from '../../../forms/button/UpButton';
import {actions} from '../../../actions/Action';

import slider from '../../../image/slider.jpg';
import col3 from '../../../image/col3.jpg';
import col4 from '../../../image/col4.jpg';
import block4 from '../../../image/block4.jpg';
import block6 from '../../../image/block6.jpg';
import img2 from '../../../image/img2.png';

export default class HomeContent extends React.Component {
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

  getImageContent(type) {
    switch (type) {
      case 'slide-1':
        return slider;
      case 'col-3':
        return col3;
      case 'col-4':
        return col4;
      case 'block-4':
        return block4;
      case 'block-6':
        return block6;
      default:
        return img2;
    }
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list;

    let content = list.map((item, index) => {
      console.log('item:', item);
      let image = this.getImageContent(item.type);
      return (
        <div key={index}>
          <img
            onClick={this.onChange.bind(this, index)}
            className={selected === index ? 'pmenu-img-selected' : 'pmenu-img'}
            src={image} />
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
        title="Home"
        selected={selected}>
        {content}
      </BaseContent>
    );
  }
}
