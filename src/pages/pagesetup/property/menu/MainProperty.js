import React from 'react';
import PickerColor from '../../../../forms/PickerColor';
import SettingDialog from '../SettingDialog';

import EnText from '../../../../forms/EnText';
//import EnButton from '../../../forms/button/EnButton';
import {actions} from '../../../../actions/Action';

export default class MainProperty extends React.Component {
  nameChange(event) {
    this.menu.brand.name = event.target.value;
    actions.page.setMenu(this.menu);
  }

  colorChange(color) {
    let menu = this.menu;
    menu.brand.css.color = color;
    actions.page.setMenu(menu);
  }

  fontChange(font, size) {
    let menu = this.menu;
    menu.brand.css.font = font;
    menu.brand.css.size = size;
    actions.page.setMenu(menu);
  }

  colorBgMenuChange(color) {
    let menu = this.menu;
    menu.css.bg_color = color;
    actions.page.setMenu(menu);
  }

  colorMenuChange(color) {
    let menu = this.menu;
    menu.css.color = color;
    actions.page.setMenu(menu);
  }

  fontMenuChange(font, size) {
    let menu = this.menu;
    menu.css.font = font;
    menu.css.size = size;
    actions.page.setMenu(menu);
  }

  render() {
    this.menu = this.props.menu;
    let menu = this.menu;

    let css = {
      width: '100%',
    };

    let brandValue = {
      color: menu.brand.css.color,
      font: menu.brand.css.font,
      size: menu.brand.css.size,
    };

    let menuValue = {
      color: menu.css.color,
      font: menu.css.font,
      size: menu.css.size,
    };

    return (
      <div>
        <div className="form-group">
          <label>ชื่อร้าน</label>
          <EnText
            value={menu.brand.name}
            onChange={this.nameChange.bind(this)}
            placeholder="ชื่อร้าน.." />
        </div>
        <div className="form-group">
          <label>ตั้งค่า ชื่อร้าน</label>
          <SettingDialog
            data={brandValue}
            colorChange={this.colorChange.bind(this)}
            fontChange={this.fontChange.bind(this)} />
        </div>
        <hr />
        <div className="form-group">
          <label>สีพื้นหลัง เมนู</label>
          <br/>
          <PickerColor
            value={menu.css.bg_color}
            css={css}
            onChange={this.colorBgMenuChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>ตั้งค่า เมนู</label>
          <SettingDialog
            data={menuValue}
            colorChange={this.colorMenuChange.bind(this)}
            fontChange={this.fontMenuChange.bind(this)} />
        </div>
      </div>
    );
  }
}
