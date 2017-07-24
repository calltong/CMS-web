import React, { Component } from 'react';
import Select from 'react-select';

export class PickerFont extends Component {
  state = {
    display: false,
  };

  fontChange(val) {
    this.props.onChange(val.value, this.size);
  }

  sizeChange(val) {
    this.props.onChange(this.font, val.value);
  }

  onOpen() {
    this.setState({ display: !this.state.display });
  }

  onClose() {
    this.setState({ display: false });
  }

  render() {
    this.size = this.props.size;
    this.font = this.props.font;
    let fonts = [
      {value: 'helvetica', label: 'Helvetica'},
      {value: 'arial', label: 'Arial'},
      {value: 'times', label: 'Times'},
      {value: 'times new roman', label: 'Times New Roman'},
      {value: 'courier', label: 'Courier'},
    ];

    let sizes = [];

    for (let i = 12; i < 30; i++) {
      sizes.push({value: i, label: `${i}`});
    }

    let css = this.props.css === undefined ? {} : this.props.css;
    let cssUI = {
      paddingRight: '2px',
      paddingLeft: '0px',
    };

    return (
      <div>
        <button
          className="btn picker-button"
          style={css}
          onClick={ this.onOpen.bind(this) }> เลือกตัวหนังสือ
        </button>
        {
          this.state.display ?
          (<div className="picker-popover">
            <div className="picker-cover" onClick={ this.onClose.bind(this) } />
            <div className="form-font">
              <div className="col-md-12" style={cssUI}>
                <div className="form-group">
                  <label>ประเภท</label>
                  <Select
                    clearable={false}
                    searchable={false}
                    value={this.font}
                    options={fonts}
                    onChange={this.fontChange.bind(this)} />
                </div>
              </div>
              <div className="col-md-12" style={cssUI}>
                <div className="form-group">
                  <label>ขนาด</label>
                  <Select
                    clearable={false}
                    searchable={false}
                    value={this.size}
                    options={sizes}
                    onChange={this.sizeChange.bind(this)} />
                </div>
              </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <button
                className="btn picker-close"
                onClick={ this.onClose.bind(this) }>
                <i className="fa fa-times-circle-o" /> Close
              </button>
            </div>
          </div>) : null
        }
      </div>
    );
  }
}

export default PickerFont;
