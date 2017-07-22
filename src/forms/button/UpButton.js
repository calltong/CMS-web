import React from 'react';

export default class UpButton extends React.Component {
  render() {
    let css = this.props.className === undefined ? 'btn btn-normal' : `btn btn-normal ${this.props.className}`;
    return (
      <button type={this.props.type || 'button'}
        className={css}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fa fa-arrow-up"/>
      </button>
    );
  }
}
