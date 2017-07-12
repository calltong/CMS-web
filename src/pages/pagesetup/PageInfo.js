import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {ReducerBase} from '../../ReducerBase';
import EnHeader from '../../forms/EnHeader';
import MainInfo from './MainInfo';
import MenuInfo from './MenuInfo';
import PageContent from './PageContent';
import PageMenu from './PageMenu';

import Property from './Property';

import SampleHome from '../sample/SampleHome';

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
        <PageMenu />
        <Property />
        <SampleHome page={data} />
        <NotificationContainer />
      </div>
    );
  }
}

export default PageInfo;

/*
<ul className="nav nav-pills">
  <li className="active"><a href="#Information" data-toggle="tab">Information</a></li>
  <li><a href="#Menu" data-toggle="tab">Menu</a></li>
  <li><a href="#Content" data-toggle="tab">Content</a></li>
</ul>

<div className="tab-content" style={{marginTop: '5px'}}>
  <div id="Information" className="tab-pane in active">
    <MainInfo data={data}/>
  </div>

  <div id="Menu" className="tab-pane">
    <MenuInfo data={data}/>
  </div>

  <div id="Content" className="tab-pane">
    <PageContent data={data}/>
  </div>
</div>
*/
