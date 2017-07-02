import React from 'react';

export default class AddButton extends React.Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={this.props.className || 'btn btn-add'}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fa fa-plus"/>
      </button>
    );
  }
}
