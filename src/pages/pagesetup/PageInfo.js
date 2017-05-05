import React from 'react';
import {Link} from 'react-router';
import {ReducerBase} from '../../ReducerBase';
//import CompleteSection from '../../forms/CompleteSection';
import EnHeader from '../../forms/EnHeader';
import MainInfo from './MainInfo';
import MenuInfo from './MenuInfo';
import SocialInfo from './SocialInfo';
import PageContent from './PageContent';


import EnButton from '../../forms/EnButton';


import {store} from '../../store';

export class PageInfo extends ReducerBase {

  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      store.update('PAGE_GET_ITEM', {id});
    } else {
      store.update('PAGE_RESET');
    }
  }

  onSave() {
    store.update('PAGE_SAVE_ITEM');
  }

  onGenerate() {
    let id = this.props.params.id;
    store.update('PAGE_GEN_PAGE', {id});
  }

  render() {
    let ob = store.getState().page;
    return (
      <div className="container-fluid">
        <EnHeader name="Page Information"/>
        <div className="row">
          <div className="col-md-12">
            <MainInfo data={ob.data}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills">
              <li className="active"><a href="#Content" data-toggle="tab">Content</a></li>
              <li><a href="#Menu" data-toggle="tab">Menu</a></li>
              <li><a href="#Social" data-toggle="tab">Social</a></li>
            </ul>

            <hr/>

            <div className="tab-content">
              <div id="Content" className="tab-pane in active">
                <PageContent data={ob.data}/>
              </div>

              <div id="Menu" className="tab-pane">
                <MenuInfo data={ob.data}/>
              </div>

              <div id="Social" className="tab-pane">
                <SocialInfo data={ob.data}/>
              </div>
            </div>
          </div>
        </div>

        <hr/>
        <div className="row">
          <div className="col-md-offset-8 col-md-4">
            <div className="text-right">
              <EnButton className="btn btn-save btn-lg" onClick={this.onGenerate.bind(this)} style={{marginLeft:4}}>
                Generate
              </EnButton>
              <Link to={`/PageManager`} className="btn btn-close btn-lg" style={{marginLeft:4}}>
                Close
              </Link>
              <EnButton className="btn btn-save btn-lg" onClick={this.onSave.bind(this)} style={{marginLeft:4}}>
                Save
              </EnButton>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default PageInfo;
