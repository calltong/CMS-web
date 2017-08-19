import React from 'react';

import {ReducerBase} from '../../../ReducerBase';
import ButtonBase from './content/ButtonBase';
import ButtonContent from './content/ButtonContent';
import {actions} from '../../../actions/Action';
import {store} from '../../../store';

export default class Footer extends ReducerBase {
  onChange(index) {
    actions.page.footer.selectMenu(index);
  }

  onAdd() {
    actions.page.footer.addItem();
  }

  onUpItem(index) {
    actions.page.footer.upItem(index);
  }

  onRemoveItem(index) {
    actions.page.footer.removeItem(index);
  }

  onAddSocial(index) {
    let item = {
      type: 'facebook',
      url: '',
    };
    actions.page.footer.addSubItem(index, item);
  }

  onL3Change(index) {
    actions.page.footer.selectSubMenu(index);
  }

  onUpL3Item(index) {
    let i = this.manage.index;
    actions.page.footer.upSubItem(i, index);
  }

  onRemoveL3Item(index) {
    let i = this.manage.index;
    actions.page.footer.removeSubItem(i, index);
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
        title="เมนูด้านล่าง"
        selected={selected.index}
        onChange={this.onChange} >
        <ButtonContent
          selected={selected.index}
          list={val}
          onChange={this.onChange}
          onUpItem={this.onUpItem} />
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
        onAdd={this.onAddSocial.bind(this, selected.index)}
        title="Social"
        selected={selected.level_2}
        onChange={this.onL3Change} >
        <ButtonContent
          selected={selected.level_2}
          index={selected}
          list={val}
          onChange={this.onL3Change}
          onUpItem={this.onUpL3Item}
          onRemoveItem={this.onRemoveL3Item} />
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
        onAdd={this.onAddSocial.bind(this, selected.index)}
        title="แบบข้อความ"
        selected={selected.level_2}
        onChange={this.onL3Change} >
        <ButtonContent
          selected={selected.level_2}
          index={selected}
          list={val}
          onChange={this.onL3Change}
          onUpItem={this.onUpL3Item}
          onRemoveItem={this.onRemoveL3Item} />
      </ButtonBase>
    );

    return content;
  }

  createInformation(list, selected) {
    let val = [
      {name: 'ร้านของเรา'},
      {name: 'การสั่งซื้อสินค้า'},
      {name: 'เงื่อนไขการสั่งซื้อ'},
    ];

    let content = (
      <ButtonBase
        title="เกี่ยวกับร้าน"
        selected={selected.level_2}
        onChange={this.onL3Change} >
        <ButtonContent
          selected={selected.level_2}
          list={val}
          onChange={this.onL3Change} />
      </ButtonBase>
    );

    return content;
  }

  render() {
    let state = store.getState();
    let manage = state.menu.manage;
    let doc = state.menu.data;

    let list = doc.data.footer.list;
    let isDefault = true;
    let content = (<div />);
    if (manage.index !== undefined) {
      let item = list[manage.index];
      if (item.type === 'social') {
        content = this.createSocial(item.data.items, manage);
        isDefault = false;
      } else if (item.type === 'text') {
        content = this.createText(item.data.items, manage);
        isDefault = false;
      } else if (item.type === 'information') {
        content = this.createInformation(item.data.items, manage);
        isDefault = false;
      }
    }

    if (isDefault) {
      content = this.createDefault(list, manage);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}
