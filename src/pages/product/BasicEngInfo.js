import React, { Component } from 'react';

import {store} from '../../store';

import EnText from '../../forms/EnText';
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

  render() {
    let data = this.props.data;
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
                  rows="8"
                  value={data.lang_eng.information.value}
                  onChange={this.infoChange.bind(this)}/>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default BasicEngInfo;
