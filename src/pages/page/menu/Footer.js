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

  onAddSocial() {
    let item = {
      type: 'facebook',
      url: '',
    };
    actions.page.footer.addSubItem(item);
  }

  onSubChange(index) {
    actions.page.footer.selectSubMenu(index);
  }

  onUpSubItem(index) {
    actions.page.footer.upSubItem(index);
  }

  onRemoveSubItem(index) {
    actions.page.footer.removeSubItem(index);
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
        onChange={this.onSubChange} >
        <ButtonContent
          selected={selected.level_2}
          list={val}
          onChange={this.onSubChange}
          onUpItem={this.onUpSubItem}
          onRemoveItem={this.onRemoveSubItem} />
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
        onChange={this.onSubChange} >
        <ButtonContent
          selected={selected.level_2}
          index={selected}
          list={val}
          onChange={this.onSubChange}
          onUpItem={this.onUpSubItem}
          onRemoveItem={this.onRemoveSubItem} />
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
        onChange={this.onSubChange} >
        <ButtonContent
          selected={selected.level_2}
          list={val}
          onChange={this.onSubChange} />
      </ButtonBase>
    );

    return content;
  }

  render() {
    let state = store.getState();
    let manage = state.menu.manage;
    let doc = state.menu.doc;

    let list = doc.data.footer.list;
    let content = (<div />);
    if (manage.index !== undefined) {
      let item = list[manage.index];
      switch (item.type) {
        case 'social':
          content = this.createSocial(item.data.items, manage);
          break;
        case 'text':
          content = this.createText(item.data.items, manage);
          break;
        case 'information':
          content = this.createInformation(item.data.items, manage);
          break;
        default:
          content = this.createDefault(list, manage);
      }
    } else {
      content = this.createDefault(list, manage);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}
