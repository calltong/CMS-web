import React from 'react';

import MainProperty from './menu/MainProperty';
import ItemProperty from './menu/ItemProperty';


export default class MenuProperty extends React.Component {
  render() {
    let selected = this.props.selected;
    let content = <div />;
    if (selected === undefined) {
      content = <MainProperty menu={this.props.data.menu} />;
    } else {
      content = <ItemProperty index={selected} menu={this.props.data.menu} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
