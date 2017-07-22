import React from 'react';

import MainMenuProperty from './MainMenuProperty';
import ItemMenuProperty from './ItemMenuProperty';


export default class MenuProperty extends React.Component {
  render() {
    let selected = this.props.selected;
    let content = <div />;
    if (selected === undefined) {
      content = <MainMenuProperty menu={this.props.data.menu} />;
    } else {
      content = <ItemMenuProperty index={selected} menu={this.props.data.menu} />;
    }
    return (
      <form>
        {content}
      </form>
    );
  }
}
