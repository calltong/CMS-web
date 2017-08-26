import React from 'react';

import {store} from '../../../store';
import Main from './home/Main';
import Title from './home/Title';
import Image from './home/Image';
import WideImage from './home/WideImage';

export default class Home extends React.Component {
  getProperty(manage, content) {
    switch (content.type) {
      case 'brand':
        return <Title index={manage.index} content={content} />;
      case 'slide-1':
        if (manage.level_2 !== undefined) {
          let item = content.data.list[manage.level_2];
          return <WideImage title={false} selected={manage} item={item} />;
        }
        break;
      case 'col-3':
      case 'col-4':
        if (manage.level_2 === undefined) {
          return <Title index={manage.index} content={content} />;
        } else {
          let item = content.data.list[manage.level_2];
          return <Image selected={manage} item={item} />;
        }
      default:
    }

    return <div />;
  }

  render() {
    let state = store.getState();
    let manage = state.home.manage;
    let doc = state.home.doc;

    let view = <div />;
    if (manage.index === undefined || doc.data.list.length === 0) {
      view = <Main data={doc.data} />;
    } else {
      let content = doc.data.list[manage.index];
      view = this.getProperty(manage, content);
    }
    return (
      <div>
        {view}
      </div>
    );
  }
}
