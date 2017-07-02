import React from 'react';

export default class RemoveButton extends React.Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={this.props.className || 'btn btn-remove'}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fa fa-times"/>
      </button>
    );
  }
}
