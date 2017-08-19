import React from 'react';

import Main from './home/Main';
import WideImage from './content/WideImage';
import ImageList from './home/ImageList';

import {store} from '../../../store';
import {actions} from '../../../actions/Action';

import blank from '../../../image/blank.png';
import blank_sq from '../../../image/blank_sq.png';

import brand from '../../../image/brand.png';
import slider from '../../../image/slider.jpg';
import col3 from '../../../image/col3.jpg';
import col4 from '../../../image/col4.jpg';
import block4 from '../../../image/block4.jpg';
import block6 from '../../../image/block6.jpg';
import img2 from '../../../image/img2.png';

export default class Home extends React.Component {
  onChange(index) {
    actions.page.home.selectMenu(index);
  }

  onAddWideItem(index) {
    let item = {
      preview: blank,
      value: '',
    };

    actions.homePage.addItem(index, item);
  }

  onAddItem(index) {
    let item = {
      preview: blank_sq,
      value: '',
    };

    actions.homePage.addItem(index, item);
  }

  onUpItem(index) {
    actions.homePage.upContent(index);
  }

  onRemoveItem(index) {
    actions.homePage.removeContent(index);
  }

  onChangeLevel3(index, indexL3) {
    actions.page.selectMenuLevel3(indexL3);
  }

  onAddLevel3(index) {
    actions.page.selectMenuLevel2(index);
  }

  onUpLevel3(index) {
    actions.page.selectMenuLevel2(index);
  }

  onRemoveLevel3(index) {
    actions.page.selectMenuLevel2(index);
  }

  getContent(item, selected) {

    switch (item.type) {
      case 'brand':
        return (
          <WideImage
            image={brand}
            onChange={this.onChangeLevel3} />);
      case 'slide-1':
        return (
          <ImageList
            image={slider}
            data={item.data}
            index={selected.index}
            selected={selected.level_3}
            onAdd={this.onAddWideItem}
            onUp={this.onUpLevel3}
            onRemove={this.onRemoveLevel3}
            onChange={this.onChangeLevel3} />);
      case 'col-3':
        return (
          <ImageList
            image={col3}
            data={item.data}
            index={selected.index}
            selected={selected.level_3}
            onAdd={this.onAddItem}
            onUp={this.onUpLevel3}
            onRemove={this.onRemoveLevel3}
            onChange={this.onChangeLevel3} />);
      case 'col-4':
        return (
          <ImageList
            image={col4}
            data={item.data}
            index={selected.index}
            selected={selected.level_3}
            onAdd={this.onAddItem}
            onUp={this.onUpLevel3}
            onRemove={this.onRemoveLevel3}
            onChange={this.onChangeLevel3} />);
      case 'block-4':
        return (
          <ImageList
            image={block4}
            data={item.data}
            index={selected.index}
            selected={selected.level_3}
            onAdd={this.onAddItem}
            onUp={this.onUpLevel3}
            onRemove={this.onRemoveLevel3}
            onChange={this.onChangeLevel3} />);
      case 'block-6':
        return (
          <ImageList
            image={block6}
            data={item.data}
            index={selected.index}
            selected={selected.level_3}
            onAdd={this.onAddItem}
            onUp={this.onUpLevel3}
            onRemove={this.onRemoveLevel3}
            onChange={this.onChangeLevel3} />);
      default:
        return img2;
    }
  }

  render() {
    let state = store.getState();
    let manage = state.homePage.manage;
    let doc = state.homePage.data;

    let list = doc.data.content_list;
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
