import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import ChooseProductDialog from '../dialog/ChooseProductDialog';
import {ReducerBase} from '../../ReducerBase';
import PageMenu from './PageMenu';
import Property from './Property';
import PropertyInfo from './PropertyInfo';
import SampleHome from '../sample/SampleHome';
import PageInfoMenu from './PageInfoMenu';

import {store} from '../../store';
import {actions} from '../../actions/Action';
//import {manager} from '../../utility/Manager';

export class PageInfo extends ReducerBase {
  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      actions.page.getItem(id);
    } else {
      actions.page.reset();
    }
  }

  OnDisplaySample() {
    window.open('http://www.facebook.com');
  }

  render() {
    let page = store.getState().page;
    let data = page.data;
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
        <SampleHome selected={page.page_menu.selected} page={data} />
        <NotificationContainer />
        <ChooseProductDialog />
      </div>
    );
  }
}

export default PageInfo;
