import React from 'react';

import {store} from '../../../store';
import MainProperty from './home/MainProperty';
import TitleProperty from './home/TitleProperty';
import ImageProperty from './home/ImageProperty';
import WideImageProperty from './home/WideImageProperty';

export default class HomeProperty extends React.Component {
  getProperty(manage, content) {
    switch (content.type) {
      case 'brand':
        return <TitleProperty index={manage.index} content={content} />;
      case 'slide-1':
        if (manage.level_2 !== undefined) {
          let item = content.data.list[manage.level_3];
          return <WideImageProperty title={false} selected={manage} item={item} />;
        }
        break;
      case 'col-3':
      case 'col-4':
        if (manage.level_2 === undefined) {
          return <TitleProperty index={manage.index} content={content} />;
        } else {
          let item = content.data.list[manage.level_2];
          return <ImageProperty selected={manage} item={item} />;
        }
      default:
    }

    return <div />;
  }

  render() {
    let state = store.getState();
    let manage = state.homePage.manage;
    let doc = state.homePage.data;

    let view = <div />;
    if (manage.index === undefined || doc.data.content_list.length === 0) {
      view = <MainProperty data={doc.data} />;
    } else {
      let content = doc.data.content_list[manage.index];
      view = this.getProperty(manage, content);
    }
    return (
      <div>
        {view}
      </div>
    );
  }
}
