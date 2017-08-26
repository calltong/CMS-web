import React from 'react';

import PickerColor from '../../../../forms/PickerColor';

import {actions} from '../../../../actions/Action';

export default class Main extends React.Component {
  colorBgChange(color) {
    let data = this.data;
    data.css.bg_color = color;
    actions.page.product_info.setData(data);
  }

  colorChange(color) {
    let data = this.data;
    data.css.color = color;
    actions.page.product_info.setData(data);
  }

  render() {
    let css = {
      width: '100%',
    };
    this.data = this.props.data;
    let data = this.data;
    console.log('product data:', data);
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>สีพื้น ปุ่ม</label>
              <PickerColor
                value={data.css.bg_color}
                css={css}
                onChange={this.colorBgChange.bind(this)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>สีตัวหนังสือ</label>
              <PickerColor
                value={data.css.color}
                css={css}
                onChange={this.colorChange.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
