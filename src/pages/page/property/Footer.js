import React from 'react';

import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';
import Main from './footer/Main';
import Title from './footer/Title';
import Header from './footer/Header';
import Text from './footer/Text';
import Social from './footer/Social';

export default class Footer extends ReducerBase {
  render() {
    let state = store.getState();
    let manage = state.menu.manage;
    let doc = state.menu.data;
    let content = <div />;
    if (manage.index === undefined) {
      content = <Main data={this.props.data.footer} />;
    } else {
      let val = doc.data.footer.list[manage.index];
      switch (val.type) {
        case 'title':
          content = <Title index={manage.index} data={val} />;
          break;
        case 'text':
          if (manage.level_2 === undefined) {
            content = <Header index={manage.index} data={val} />;
          } else {
            let item = val.data.items[manage.level_2];
            content = <Text index={manage} data={item} />;
          }
          break;
        case 'social':
          if (manage.level_2 === undefined) {
            content = <Header index={manage.index} data={val} />;
          } else {
            let item = val.data.items[manage.level_2];
            content = <Social index={manage} data={item} />;
          }
          break;
        case 'information':
          if (manage.level_2 === undefined) {
            content = <Header index={manage.index} data={val} />;
          } else {
            content = <div />;
          }
          break;
        default:
          content = <Header index={manage.index} data={val} />;
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
