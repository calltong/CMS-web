import React from 'react';

import Main from './product/Main';
import WideImage from './content/WideImage';
import ImageList from './content/ImageList';

import {store} from '../../../store';
import {actions} from '../../../actions/Action';

import blank_wide from '../../../image/blank_wide.png';
import blank from '../../../image/blank.png';

import brand from '../../../image/brand.png';
import slider from '../../../image/slider.jpg';
import col3 from '../../../image/col3.jpg';
import col4 from '../../../image/col4.jpg';
import block4 from '../../../image/block4.jpg';
import block6 from '../../../image/block6.jpg';
import img2 from '../../../image/img2.png';

export default class Product extends React.Component {
  onChangeSub(index) {
    actions.page.product_info.selectSubMenu(index);
  }

  onAddWideItem() {
    let item = {
      preview: blank_wide,
      value: '',
    };

    actions.page.product_info.addItem(item);
  }

  onAddItem() {
    let item = {
      preview: blank,
      value: '',
    };

    actions.page.product_info.addItem(item);
  }

  onUpSub(index) {
    actions.page.product_info.upItem(index);
  }

  onRemoveSub(index) {
    actions.page.product_info.removeItem(index);
  }

  getContent(item, selected) {

    switch (item.type) {
      case 'brand':
        return (
          <WideImage
            image={brand}
            onChange={this.onChangeSub} />);
      case 'slide-1':
        return (
          <ImageList
            image={slider}
            data={item.data}
            selected={selected.level_2}
            onAdd={this.onAddWideItem}
            onUp={this.onUpSub}
            onRemove={this.onRemoveSub}
            onChange={this.onChangeSub} />);
      case 'col-3':
        return (
          <ImageList
            image={col3}
            data={item.data}
            selected={selected.level_2}
            onAdd={this.onAddItem}
            onUp={this.onUpSub}
            onRemove={this.onRemoveSub}
            onChange={this.onChangeSub} />);
      case 'col-4':
        return (
          <ImageList
            image={col4}
            data={item.data}
            selected={selected.level_2}
            onAdd={this.onAddItem}
            onUp={this.onUpSub}
            onRemove={this.onRemoveSub}
            onChange={this.onChangeSub} />);
      case 'block-4':
        return (
          <ImageList
            image={block4}
            data={item.data}
            selected={selected.level_2}
            onAdd={this.onAddItem}
            onUp={this.onUpSub}
            onRemove={this.onRemoveSub}
            onChange={this.onChangeSub} />);
      case 'block-6':
        return (
          <ImageList
            image={block6}
            data={item.data}
            selected={selected.level_2}
            onAdd={this.onAddItem}
            onUp={this.onUpSub}
            onRemove={this.onRemoveSub}
            onChange={this.onChangeSub} />);
      default:
        return img2;
    }
  }

  render() {
    let state = store.getState();
    let manage = state.product_info.manage;
    let doc = state.product_info.doc;
    let list = doc.data.list;
    let block = <div />;
    if (manage.index === undefined) {
      block = (
        <Main selected={manage} list={list} />
      );
    } else {
      let item = list[manage.index];
      block = this.getContent(item, manage);
    }

    return (
      <div>
        {block}
      </div>
    );
  }
}
