import React from 'react';

import Item from './orderCondition/Item';

export default class OrderCondition extends React.Component {
  render() {
    let selected = this.props.selected;
    let content = <div />;
    if (selected.level_2 === undefined) {
      content = <div />;
    } else {
      let item = this.props.data.condition.list[selected.level_2];
      content = <Item index={selected.level_2} data={item} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
