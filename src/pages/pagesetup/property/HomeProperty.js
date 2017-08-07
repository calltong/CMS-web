import React from 'react';

import MainProperty from './home/MainProperty';
import TitleProperty from './home/TitleProperty';
import ImageProperty from './home/ImageProperty';
import WideImageProperty from './home/WideImageProperty';

export default class HomeProperty extends React.Component {
  getProperty(selected, content) {
    switch (content.type) {
      case 'brand':
        return <TitleProperty index={selected.level_2} content={content} />;
      case 'slide-1':
        if (selected.level_3 !== undefined) {
          let item = content.data.list[selected.level_3];
          return <WideImageProperty title={false} selected={selected} item={item} />;
        }
        break;
      case 'col-3':
      case 'col-4':
        if (selected.level_3 === undefined) {
          return <TitleProperty index={selected.level_2} content={content} />;
        } else {
          let item = content.data.list[selected.level_3];
          return <ImageProperty selected={selected} item={item} />;
        }
      default:
    }

    return <div />;
  }

  render() {
    let selected = this.props.selected;
    let data = this.props.data;
    let view = <div />;
    if (selected.level_2 === undefined || data.content_list.length === 0) {
      view = <MainProperty data={data} />;
    } else {
      let content = data.content_list[selected.level_2];
      view = this.getProperty(selected, content);
    }
    return (
      <div>
        {view}
      </div>
    );
  }
}
