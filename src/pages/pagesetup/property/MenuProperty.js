import React from 'react';

import MainProperty from './menu/MainProperty';
import ItemProperty from './menu/ItemProperty';

export default class MenuProperty extends React.Component {
  render() {
    let selected = this.props.selected;
    let content = <div />;
    if (selected.level_2 === undefined) {
      content = <MainProperty data={this.props.data.menu} />;
    } else {
      let menu = this.props.data.menu.list[selected.level_2];
      content = <ItemProperty index={selected.level_2} data={menu} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
