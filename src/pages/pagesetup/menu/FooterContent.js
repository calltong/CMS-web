import React from 'react';

import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';
import {actions} from '../../../actions/Action';

export default class FooterContent extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  onAdd() {
    actions.footerPage.addItem();
  }

  onUpItem(index) {
    actions.footerPage.upItem(index);
  }

  onRemoveItem(index) {
    actions.footerPage.removeItem(index);
  }

  onAddSocial(index) {
    let item = {
      type: 'facebook',
      url: '',
    };
    actions.footerPage.addSubItem(index, item);
  }

  onL3Change(index) {
    actions.page.selectMenuLevel3(index);
  }

  getName(val) {
    switch (val) {
      case 'title':
        return 'แบบหัวข้อ';
      case 'social':
        return 'Social';
      case 'text':
        return 'แบบข้อความ';
      case 'information':
        return 'เกียวกับร้าน';
      default:
        return 'Content';
    }
  }

  getSocialName(val) {
    switch (val) {
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'line':
        return 'Line';
      case 'youtube':
        return 'Youtube';
      default:
        return 'Content';
    }
  }

  createDefault(list, selected) {
    let val = list.map(item => {
      let data = {
        name: this.getName(item.type),
      };
      return data;
    });

    let content = (
      <ButtonBase
        title="Footer"
        selected={selected.level_2} >
        <ButtonContent
          selected={selected.level_2}
          list={val}
          onChange={this.onChange}
          onUpItem={this.onUpItem}
          />
      </ButtonBase>
    );

    return content;
  }

  createSocial(list, selected) {
    let val = list.map(item => {
      let data = {
        name: this.getSocialName(item.type),
      };
      return data;
    });

    let content = (
      <ButtonBase
        onAdd={this.onAddSocial.bind(this, selected.level_2)}
        title="Social"
        selected={selected.level_3} >
        <ButtonContent
          selected={selected.level_3}
          list={val}
          onChange={this.onL3Change}
          onUpItem={this.onUpItem}
          onRemoveItem={this.onRemoveItem}
          />
      </ButtonBase>
    );

    return content;
  }

  createText(list, selected) {
    let val = list.map((item, index) => {
      let data = {
        name: `ข้อความ (${index+1})`,
      };
      return data;
    });

    let content = (
      <ButtonBase
        onAdd={this.onAddSocial.bind(this, selected.level_2)}
        title="แบบข้อความ"
        selected={selected.level_3} >
        <ButtonContent
          selected={selected.level_3}
          list={val}
          onChange={this.onL3Change}
          onUpItem={this.onUpItem}
          onRemoveItem={this.onRemoveItem}
          />
      </ButtonBase>
    );

    return content;
  }

  render() {
    let selected = this.props.selected;
    let list = this.props.list;
    let isDefault = true;
    let content = (<div />);
    if (selected.level_2 !== undefined) {
      let item = list[selected.level_2];
      if (item.type === 'social') {
        content = this.createSocial(item.data.items, selected);
        isDefault = false;
      } else if (item.type === 'text') {
        content = this.createText(item.data.items, selected);
        isDefault = false;
      }
    }

    if (isDefault) {
      content = this.createDefault(list, selected);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}