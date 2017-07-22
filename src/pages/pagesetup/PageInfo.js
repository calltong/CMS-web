import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {ReducerBase} from '../../ReducerBase';
import PageMenu from './PageMenu';

import Property from './Property';
import SaveButton from '../../forms/button/SaveButton';
import BuildButton from '../../forms/button/BuildButton';
import ResetButton from '../../forms/button/ResetButton';
import EnButton from '../../forms/button/EnButton';
import PropertyInfo from './PropertyInfo';
import SampleHome from '../sample/SampleHome';

import {store} from '../../store';
import {actions} from '../../actions/Action';
//import {manager} from '../../utility/Manager';

class PageInfoMenu extends React.Component {
  onSave() {
    actions.page.saveItem();
    //store.update('PAGE_SAVE_ITEM');
  }

  onBuild() {
    //let id = this.props.params.id;
    //store.update('PAGE_GEN_PAGE', {id});
  }

  onReset() {
    //let id = this.props.params.id;
    //store.update('PAGE_GEN_PAGE', {id});
  }

  render() {
    let css = {
      marginRight: '2px',
      width: '140px',
    };
    return (
      <div style={{marginTop: '10px'}}>
      <BuildButton style={css} onClick={this.onBuild.bind(this)} />

      <SaveButton style={css} onClick={this.onSave.bind(this)} />

      <ResetButton style={css} onClick={this.onReset.bind(this)} />

      <EnButton className="btn btn-normal" style={css}>Pages Menu</EnButton>
      <EnButton className="btn btn-normal" style={css}>Properties</EnButton>
      </div>
    );
  }
}

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
        <Property>
          <PropertyInfo />
        </Property>
        <PageInfoMenu />
        <hr style={{borderTop: '1px solid #555555'}}/>
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
