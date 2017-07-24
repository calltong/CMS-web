import React from 'react';

import MainProperty from './home/MainProperty';
import Slider1Property from './home/Slider1Property';

export default class HomeProperty extends React.Component {
  render() {
    let selected = this.props.selected;
    let data = this.props.data;
    let content = <div />;
    console.log('index:', selected);
    if (selected === undefined) {
      content = <MainProperty data={data} />;
    } else {
      content = <Slider1Property index={selected} list={data.content_list} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
