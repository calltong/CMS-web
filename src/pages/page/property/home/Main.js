import React from 'react';

import PickerColor from '../../../../forms/PickerColor';
import TextSetting from '../TextSetting';

export default class Main extends React.Component {
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
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>สีพื้นหลัง เมนู</label>
              <PickerColor
                value={data.css.bg_color}
                css={css}
                onChange={this.colorBgChange.bind(this)}/>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>ตั้งค่า เมนู</label>
              <TextSetting
                data={value}
                colorChange={this.colorChange.bind(this)}
                fontChange={this.fontChange.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
