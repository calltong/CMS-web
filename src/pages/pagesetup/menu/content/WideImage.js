import React from 'react';

export default class WideImage extends React.Component {
  onChange(index) {
    this.props.onChange(index);
  }

  render() {
    let image = this.props.image;
    let selected = this.props.selected;

    return (
        <img
          className={selected === undefined ? 'menu-content-wideimg-selected' : 'menu-content-wideimg'}
          onClick={this.onChange.bind(this, undefined)}
          role="presentation"
          src={image} />
    );
  }
}
