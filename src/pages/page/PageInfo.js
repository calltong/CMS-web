import React from 'react';

import ChooseProductDialog from '../dialog/ChooseProductDialog';
import {ReducerBase} from '../../ReducerBase';
import PageMenu from './PageMenu';
import Property from './Property';
import PropertyInfo from './PropertyInfo';
import Home from '../sample/Home';
import PageInfoMenu from './PageInfoMenu';

import {store} from '../../store';

export class PageInfo extends ReducerBase {
  OnDisplaySample() {
    window.open('http://www.facebook.com');
  }

  render() {
    let state = store.getState();
    let page = state.page;

    return (
      <div id="page">
        <PageMenu display={page.form.menu.display} />
        <Property display={page.form.property.display} >
          <PropertyInfo />
        </Property>

        <PageInfoMenu/>
        <hr style={{borderTop: '1px solid #555555'}}/>
        <Home />
        <ChooseProductDialog />
      </div>
    );
  }
}

export default PageInfo;
