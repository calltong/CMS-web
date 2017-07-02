import React from 'react';
import {ReducerBase} from '../../ReducerBase';

import EnHeader from '../../forms/EnHeader';
import MainInfo from './MainInfo';
import MenuInfo from './MenuInfo';
import PageContent from './PageContent';

import SaveButton from '../../forms/SaveButton';
import CloseButton from '../../forms/CloseButton';
import BuildButton from '../../forms/BuildButton';
import ResetButton from '../../forms/ResetButton';

import {store} from '../../store';
import {actions} from '../../actions/Action';

export class PageInfo extends ReducerBase {

  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      actions.page.getItem(id);
    } else {
      actions.page.reset();
    }
  }

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
    let data = store.getState().page.data;
    return (
      <div className="container-fluid">
        <EnHeader name="Page Information"/>

        <div className="row">
          <div className="col-md-12">
            <BuildButton onClick={this.onBuild.bind(this)} />

            <SaveButton onClick={this.onSave.bind(this)} />

            <ResetButton onClick={this.onReset.bind(this)} />

            <CloseButton to={'/PageManager'} />
          </div>
        </div>
        <hr/>

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

      </div>
    );
  }
}

export default PageInfo;
