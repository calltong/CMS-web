import React from 'react';

export default class BuildButton extends React.Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={this.props.className || 'btn btn-menu btn-normal'}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fa fa-building-o"/> Build
      </button>
    );
  }
}
