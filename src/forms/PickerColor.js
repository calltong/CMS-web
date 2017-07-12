import React from 'react';
import { SketchPicker } from 'react-color';

export default class PickerColor extends React.Component {
  state = {
    displayColor: false,
    color: '#ffffff',
  };

  onCompleted(color) {
    console.log('color:', color.hex);
    //this.setState({ color: color.hex });
    this.props.onChange(color.hex);
  }

  onColorClick() {
    this.setState({ displayColor: !this.state.displayColor });
  }

  onColorClose() {
    this.setState({ displayColor: false });
  }

  invertColor(hexTripletColor) {
    let color = hexTripletColor;
    color = color.substring(1);           // remove #
    color = parseInt(color, 16);          // convert to integer
    color = 0xFFFFFF ^ color;             // invert three bytes
    color = color.toString(16);           // convert to hex
    color = ('000000' + color).slice(-6); // pad with leading zeros
    color = '#' + color;                  // prepend #
    return color;
  }

  render() {
    let color = this.props.value === undefined ? '#FFFFFF' : this.props.value;
    return (
      <div>
        <button
          className="btn picker-color-button"
          style={{
            color: this.invertColor(color),
            backgroundColor: color,
          }}
          onClick={ this.onColorClick.bind(this) }> เลือกสี
        </button>
        {
          this.state.displayColor ?
          (<div className="color-popover">
            <div className="color-cover" onClick={ this.onColorClose.bind(this) } />
            <SketchPicker
              color={color}
              width={240}
              onChangeComplete={ this.onCompleted.bind(this) } />
            <div style={{textAlign: 'center'}}>
              <button className="btn picker-color-close" onClick={ this.onColorClose.bind(this) }>
                <i className="fa fa-times-circle-o" /> Close
              </button>
            </div>
          </div>) : null
        }
      </div>
    );
  }
}
