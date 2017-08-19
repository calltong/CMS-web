import React from 'react';

import Title from './aboutus/Title';
import Item from './aboutus/Item';

export default class AboutUs extends React.Component {
  render() {
    let selected = this.props.selected;
    let content = <div />;
    if (selected.level_2 === undefined) {
      content = <Title data={this.props.data.about_us} />;
    } else {
      let item = this.props.data.about_us.list[selected.level_2];
      content = <Item index={selected.level_2} data={item} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
