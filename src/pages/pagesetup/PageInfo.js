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

  onDisplayMenu() {
    let form = store.getState().page.form;
    form.menu.display = form.menu.display === 'block' ? 'none' : 'block';
    store.update('PAGE_GEN_PAGE', {data: form});
  }

  onDisplayProperty() {
    let form = store.getState().page.form;
    form.property.display = form.property.display === 'block' ? 'none' : 'block';
    store.update('PAGE_GEN_PAGE', {data: form});
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

      <EnButton className="btn btn-normal"
        onClick={this.onDisplayMenu.bind(this)}
        style={css}>
        <i className="fa fa-bars" /> Pages Menu
      </EnButton>
      <EnButton
        onClick={this.onDisplayProperty.bind(this)}
        className="btn btn-normal"
        style={css}>
        <i className="fa fa-tasks" /> Properties
      </EnButton>
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
        <PageMenu display={page.form.menu.display} />
        <Property display={page.form.property.display} >
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
