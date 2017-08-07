import React from 'react';

import ButtonBase from '../content/ButtonBase';
import RemoveButton from '../../../../forms/button/RemoveButton';
import UpButton from '../../../../forms/button/UpButton';
import {actions} from '../../../../actions/Action';

import brand from '../../../../image/brand.png';
import slider from '../../../../image/slider.jpg';
import col3 from '../../../../image/col3.jpg';
import col4 from '../../../../image/col4.jpg';
import block4 from '../../../../image/block4.jpg';
import block6 from '../../../../image/block6.jpg';
import img2 from '../../../../image/img2.png';

export default class Main extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  onAdd() {
    actions.contentPage.addContent({});
  }

  onUpItem(index) {
    actions.contentPage.upContent(index);
  }

  onRemoveItem(index) {
    actions.contentPage.removeContent(index);
  }

  getImageContent(type) {
    switch (type) {
      case 'brand':
        return brand;
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
      let image = this.getImageContent(item.type);
      return (
        <div key={index}>
          <img
            onClick={this.onChange.bind(this, index)}
            className="pmenu-img"
            src={image}
            role="presentation" />
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
      <ButtonBase
        onAdd={this.onAdd.bind(this)}
        title="Home"
        selected={selected.level_2}>
        {content}
      </ButtonBase>
    );
  }
}
