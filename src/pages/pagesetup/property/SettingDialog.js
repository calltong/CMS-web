import React from 'react';
import PickerColor from '../../../forms/PickerColor';
import PickerFont from '../../../forms/PickerFont';

export default class SettingDialog extends React.Component {
  render() {
    let css = {
      width: '100%',
    };

    let data = this.props.data;
    return (
      <div className="row">
        <div className="col-md-6">
          <PickerColor
            value={data.color}
            css={css}
            onChange={this.props.colorChange}/>
        </div>
        <div className="col-md-6">
          <PickerFont
            size={data.size}
            font={data.font}
            css={css}
            onChange={this.props.fontChange}/>
        </div>
      </div>
    );
  }
}
