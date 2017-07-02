import React from 'react';

export default class TableRemoveBtn extends React.Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={this.props.className || 'btn btn-table btn-fullsize btn-remove'}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fa fa-close" data-tip="delete"/> Del
      </button>
    );
  }
}
