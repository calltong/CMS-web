import React from 'react';

export default class AddButton extends React.Component {
  render() {
    let css = this.props.className === undefined ? 'btn btn-add' : `btn btn-add ${this.props.className}`;
    return (
      <button type={this.props.type || 'button'}
        className={css}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fa fa-plus"/> {this.props.children}
      </button>
    );
  }
}
