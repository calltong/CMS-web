import React, { Component } from 'react';

export class EnText extends Component {
  value() {
    return this.refs.enInput.value;
  }

  clear() {
    this.refs.enInput.value = '';
  }

  render() {
    return (
      <input ref='enInput'
        id={this.props.id}
        type={this.props.type || 'text'}
        className={`form-control ${this.props.className || ''}`}
        style={this.props.style}
        placeholder={this.props.placeholder || ''}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyPress={this.props.onKeyPress}
        readOnly={this.props.readOnly || false}
        disabled={this.props.disabled || false}
      />
    );
  }
}

export default EnText;
