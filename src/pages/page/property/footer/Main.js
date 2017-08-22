import React from 'react';
import PickerColor from '../../../../forms/PickerColor';
import TextSetting from '../TextSetting';

import {actions} from '../../../../actions/Action';

export default class Main extends React.Component {
  colorBgChange(color) {
    let data = this.data;
    data.css.bg_color = color;
    actions.page.footer.setMain(this.data);
  }

  colorChange(color) {
    let data = this.data;
    data.css.color = color;
    actions.page.footer.setMain(this.data);
  }

  fontChange(font, size) {
    let data = this.data;
    data.css.font = font;
    data.css.size = size;
    actions.page.footer.setMain(this.data);
  }

  render() {
    this.data = this.props.data;
    let data = this.data;

    let css = {
      width: '100%',
    };

    let dataValue = {
      color: data.css.color,
      font: data.css.font,
      size: data.css.size,
    };

    return (
      <div>
        <div className="form-group">
          <label>สีพื้นหลัง Footer</label>
          <br/>
          <PickerColor
            value={data.css.bg_color}
            css={css}
            onChange={this.colorBgChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>ตั้งค่า เมนู</label>
          <TextSetting
            data={dataValue}
            colorChange={this.colorChange.bind(this)}
            fontChange={this.fontChange.bind(this)} />
        </div>
      </div>
    );
  }
}
