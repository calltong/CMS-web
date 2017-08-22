import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import ChooseProductDialog from '../dialog/ChooseProductDialog';
import {ReducerBase} from '../../ReducerBase';
import PageMenu from './PageMenu';
import Property from './Property';
import PropertyInfo from './PropertyInfo';
import Home from '../sample/Home';
import PageInfoMenu from './PageInfoMenu';

import {store} from '../../store';
import {actions} from '../../actions/Action';
//import {manager} from '../../utility/Manager';

export class PageInfo extends ReducerBase {
  componentDidMount() {
    actions.page.main.getMenu();
    actions.page.main.getHome();
    actions.page.main.getAboutus();
    actions.page.main.getHowToBuy();
    actions.page.main.getOrderCondition();
  }

  OnDisplaySample() {
    window.open('http://www.facebook.com');
  }

  render() {
    let state = store.getState();
    let page = state.page;
    let message = page.message;

    if (message.text !== '') {
      if (message.type === 'error') {
        NotificationManager.error(message.text);
      } else {
        NotificationManager.success(message.text);
      }
    }

    return (
      <div id="page">
        <PageMenu display={page.form.menu.display} />
        <Property display={page.form.property.display} >
          <PropertyInfo />
        </Property>

        <PageInfoMenu/>
        <hr style={{borderTop: '1px solid #555555'}}/>
        <Home />
        <NotificationContainer />
        <ChooseProductDialog />
      </div>
    );
  }
}

export default PageInfo;
