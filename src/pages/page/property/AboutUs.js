import React from 'react';
import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';

import Title from './aboutus/Title';
import Item from './aboutus/Item';

export default class AboutUs extends ReducerBase {
  render() {
    let state = store.getState();
    let manage = state.about_us.manage;
    let doc = state.about_us.doc;

    let content = <div />;
    if (manage.index === undefined) {
      content = <Title data={doc.data} />;
    } else {
      let item = doc.data.list[manage.index];
      content = <Item index={manage.index} data={item} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}
