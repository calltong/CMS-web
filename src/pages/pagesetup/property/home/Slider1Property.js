import React from 'react';

import EnText from '../../../../forms/EnText';

export default class Slider1Property extends React.Component {
  render() {
    /*
    let css = {
      width: '100%',
    };
    this.data = this.props.data;
    let data = this.data;
    */
    return (
      <div>
        <div className="form-group">
          <label>สีพื้นหลัง เมนู</label>
          <EnText />
        </div>
        <div className="form-group">
          <label>ตั้งค่า เมนู</label>
          <EnText />
        </div>
      </div>
    );
  }
}
