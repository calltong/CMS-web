import React from 'react';

import EnText from '../../forms/EnText';
import EnTextArea from '../../forms/EnTextArea';
import SocialInfo from './SocialInfo';

export default class MainInfo extends React.Component {

  nameChange(event) {

  }

  render() {
    let data = this.props.data;
    let info = data.information;
    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Name</label>
                <EnText
                  placeholder="Enter name..."
                  value={data.name || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Company</label>
                <EnText
                  placeholder="Enter company..."
                  value={info.company || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group">
                <label>Status</label>
                <EnText
                  value={data.status || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group">
                <label>Updated</label>
                <EnText
                  value={data.updated || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Mobile</label>
                <EnText
                  placeholder="Enter mobile..."
                  value={info.mobile || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Email</label>
                <EnText
                  placeholder="Enter email..."
                  value={info.email || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Detail</label>
                <EnTextArea
                  placeholder="Enter detail..."
                  rows="4"
                  value={info.detail || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Address</label>
                <EnTextArea
                  placeholder="Enter address..."
                  rows="4"
                  value={info.address || ''}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>
          </div>

          <SocialInfo data={data}/>

        </div>
      </div>
    );
  }
}
