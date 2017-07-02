import React from 'react';

export default class SaveButton extends React.Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={this.props.className || 'btn btn-menu btn-save'}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fa fa-floppy-o"/> Save
      </button>
    );
  }
}
