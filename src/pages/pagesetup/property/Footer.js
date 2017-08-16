import React from 'react';

import Main from './footer/Main';
import Title from './footer/Title';
import Header from './footer/Header';
import Text from './footer/Text';
import Social from './footer/Social';

export default class Footer extends React.Component {
  render() {
    let selected = this.props.selected;
    let content = <div />;
    if (selected.level_2 === undefined) {
      content = <Main data={this.props.data.footer} />;
    } else {
      let val = this.props.data.footer.list[selected.level_2];
      switch (val.type) {
        case 'title':
          content = <Title index={selected.level_2} data={val} />;
          break;
        case 'text':
          if (selected.level_3 === undefined) {
            content = <Header index={selected.level_2} data={val} />;
          } else {
            let item = val.data.items[selected.level_3];
            content = <Text index={selected} data={item} />;
          }
          break;
        case 'social':
          if (selected.level_3 === undefined) {
            content = <Header index={selected.level_2} data={val} />;
          } else {
            let item = val.data.items[selected.level_3];
            content = <Social index={selected} data={item} />;
          }
          break;
        case 'information':
          if (selected.level_3 === undefined) {
            content = <Header index={selected.level_2} data={val} />;
          } else {
            content = <div />;
          }
          break;
        default:
          content = <Header index={selected.level_2} data={val} />;
          break;
      }
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
