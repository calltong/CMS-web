import React from 'react';

import Item from './toBuy/Item';

export default class ToBuy extends React.Component {
  render() {
    let selected = this.props.selected;
    let content = <div />;
    if (selected.level_2 === undefined) {
      content = <div />;
    } else {
      let item = this.props.data.how_to_buy.list[selected.level_2];
      content = <Item index={selected.level_2} data={item} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
