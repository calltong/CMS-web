import React from 'react';

import Main from './home/Main';
import WideImage from './content/WideImage';
import ImageList from './home/ImageList';

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

export default class HomeContent extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
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
            index={selected.level_2}
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
            index={selected.level_2}
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
            index={selected.level_2}
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
            index={selected.level_2}
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
            index={selected.level_2}
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
    let selected = this.props.selected;
    this.selected = selected;
    let list = this.props.list;
    let block = <div />;
    if (selected.level_2 === undefined) {
      block = (
        <Main
          selected={selected}
          list={list} />);
    } else {
      let item = list[selected.level_2];
      block = this.getContent(item, selected);
    }

    return (
      <div>
        {block}
      </div>
    );
  }
}
