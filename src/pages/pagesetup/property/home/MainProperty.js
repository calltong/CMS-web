import React from 'react';

import PickerColor from '../../../../forms/PickerColor';
import SettingDialog from '../SettingDialog';

export default class MainHomeProperty extends React.Component {
  colorBgChange(color) {

  }

  colorChange(color) {

  }

  fontChange() {
    
  }

  render() {
    let css = {
      width: '100%',
    };
    this.data = this.props.data;
    let data = this.data;

    let value = {
      color: data.css.color,
      font: data.css.font,
      size: data.css.size,
    };
    return (
      <div>
        <div className="form-group">
          <label>สีพื้นหลัง เมนู</label>
          <br/>
          <PickerColor
            value={data.css.bg_color}
            css={css}
            onChange={this.colorBgChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>ตั้งค่า เมนู</label>
          <SettingDialog
            data={value}
            colorChange={this.colorChange.bind(this)}
            fontChange={this.fontChange.bind(this)} />
        </div>
      </div>
    );
  }
}
