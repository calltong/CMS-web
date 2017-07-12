import React, { Component } from 'react';
import Select from 'react-select';

export class PickerFont extends Component {
  fontChange(val) {
    console.log('font:', val);
    this.props.onChange(val.value, this.size);
  }

  sizeChange(val) {
    console.log('size:', val);
    this.props.onChange(this.font, val.value);
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

    for (let i = 12; i < 28; i++) {
      sizes.push({value: i, label: `${i}`});
    }

    let css = {
      paddingRight: '2px',
      paddingLeft: '0px',
    };
    return (
      <div >
        <div className="col-md-8" style={css}>
          <Select
            clearable={false}
            searchable={false}
            value={this.font}
            options={fonts}
            onChange={this.fontChange.bind(this)} />
        </div>
        <div className="col-md-4" style={css}>
          <Select
            clearable={false}
            searchable={false}
            value={this.size}
            options={sizes}
            onChange={this.sizeChange.bind(this)} />
        </div>
      </div>
    );
  }
}

export default PickerFont;
