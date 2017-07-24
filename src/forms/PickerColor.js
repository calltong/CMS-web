import React from 'react';
import { SketchPicker } from 'react-color';

export default class PickerColor extends React.Component {
  state = {
    display: false,
    color: '#ffffff',
  };

  onCompleted(color) {
    this.props.onChange(color.hex);
  }

  onOpen() {
    this.setState({ display: !this.state.display });
  }

  onClose() {
    this.setState({ display: false });
  }

  render() {
    let color = this.props.value === undefined ? '#FFFFFF' : this.props.value;
    let css = this.props.css === undefined ? {} : this.props.css;
    let width = this.props.width === 250 ? {} : this.props.width;
    return (
      <div>
        <button
          className="btn picker-button"
          style={css}
          onClick={ this.onOpen.bind(this) }> เลือกสี
        </button>
        {
          this.state.display ?
          (<div className="picker-popover">
            <div className="picker-cover" onClick={ this.onClose.bind(this) } />
            <SketchPicker
              color={color}
              width={width}
              onChangeComplete={ this.onCompleted.bind(this) } />
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
