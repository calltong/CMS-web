import React from 'react';
import PickerColor from '../../../../forms/PickerColor';
import TextSetting from '../TextSetting';

import EnText from '../../../../forms/EnText';
import {actions} from '../../../../actions/Action';

export default class MainProperty extends React.Component {
  nameChange(event) {
    this.data.brand.name = event.target.value;
    actions.menuPage.setMain(this.data);
  }

  colorChange(color) {
    let data = this.data;
    data.brand.css.color = color;
    actions.menuPage.setMain(data);
  }

  fontChange(font, size) {
    let data = this.data;
    data.brand.css.font = font;
    data.brand.css.size = size;
    actions.menuPage.setMain(data);
  }

  colorBgMenuChange(color) {
    let data = this.data;
    data.css.bg_color = color;
    actions.menuPage.setMain(data);
  }

  colorMenuChange(color) {
    let data = this.data;
    data.css.color = color;
    actions.menuPage.setMain(data);
  }

  fontMenuChange(font, size) {
    let data = this.data;
    data.css.font = font;
    data.css.size = size;
    actions.menuPage.setMain(data);
  }

  render() {
    this.data = this.props.data;
    let data = this.data;

    let css = {
      width: '100%',
    };

    let brandValue = {
      color: data.brand.css.color,
      font: data.brand.css.font,
      size: data.brand.css.size,
    };

    let dataValue = {
      color: data.css.color,
      font: data.css.font,
      size: data.css.size,
    };

    return (
      <div>
        <div className="form-group">
          <label>ชื่อร้าน</label>
          <EnText
            value={data.brand.name}
            onChange={this.nameChange.bind(this)}
            placeholder="ชื่อร้าน.." />
        </div>
        <div className="form-group">
          <label>ตั้งค่า ชื่อร้าน</label>
          <TextSetting
            data={brandValue}
            colorChange={this.colorChange.bind(this)}
            fontChange={this.fontChange.bind(this)} />
        </div>
        <hr />
        <div className="form-group">
          <label>สีพื้นหลัง เมนู</label>
          <br/>
          <PickerColor
            value={data.css.bg_color}
            css={css}
            onChange={this.colorBgMenuChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>ตั้งค่า เมนู</label>
          <TextSetting
            data={dataValue}
            colorChange={this.colorMenuChange.bind(this)}
            fontChange={this.fontMenuChange.bind(this)} />
        </div>
      </div>
    );
  }
}
