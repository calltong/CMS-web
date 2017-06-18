import React, { Component } from 'react';

import {store} from '../../store';

import EnText from '../../forms/EnText';
import EnButton from '../../forms/EnButton';
import EnTextArea from '../../forms/EnTextArea';

export class BasicEngInfo extends Component {
  nameChange(event) {
    let data = this.props.data;
    data.lang_eng.name = event.target.value;
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  infoChange(event) {
    let data = this.props.data;
    data.lang_eng.information.value = event.target.value;
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  infoListChange(index, event) {
    let data = this.props.data;
    data.lang_eng.information.list[index] = event.target.value;
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  onInfoListAdd() {
    let data = this.props.data;
    console.log('data:', data);
    data.lang_eng.information.list.push('');
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  onInfoListDelete(index) {
    let data = this.props.data;
    data.lang_eng.information.list.splice(index, 1);
  }

  render() {
    let data = this.props.data;
    let index = 0;
    let infoList = data.lang_eng.information.list.map(item => {
      return (
        <div className="row" key={index} style={{marginTop:4}}>
          <div className="col-sm-10 col-md-10">
            <EnText
              value={item}
              onChange={this.infoListChange.bind(this, index)} />
          </div>
          <div className="col-sm-2 col-md-2">
            <EnButton onClick={this.onInfoListDelete.bind(this, index++)} className="btn btn-remove">Del</EnButton>
          </div>
        </div>
      );
    });
    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label>Name</label>
                <EnText
                  placeholder="Enter english name..."
                  value={data.lang_eng.name}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label>Information</label>
                <EnTextArea
                  placeholder="Enter English Information..."
                  rows="4"
                  value={data.lang_eng.information.value}
                  onChange={this.infoChange.bind(this)}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <EnButton onClick={this.onInfoListAdd.bind(this)} className="btn btn-add" style={{marginTop:2}}>
              Add Bullet
              </EnButton>
              {infoList}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default BasicEngInfo;
