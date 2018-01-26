import React from 'react';
import {observer, inject} from 'mobx-react';

import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

class EcommerceLazada extends React.Component {
  nameChange(event) {
    let data = this.props.data;
    data.ecommerce.lazada.code = event.target.value;
    this.props.ma_size.setItem(data);
  }

  render() {
    let data = this.props.data;
    return (
    <div className="panel panel-default">
      <div className="panel-heading">Lazada</div>
      <div className="panel-body">
        <div className="form-group">
          <label>Name</label>
          <EnText
            placeholder="Enter name..."
            value={data.ecommerce.lazada.code}
            onChange={this.nameChange.bind(this)} />
        </div>
      </div>
    </div>
  );
  }
}

class Information extends React.Component {
  codeChange(event) {
    let data = this.props.data;
    data.code = event.target.value;
    this.props.ma_size.setItem(data);
  }

  nameChange(event) {
    let data = this.props.data;
    data.name = event.target.value;
    this.props.ma_size.setItem(data);
  }

  render() {
    let data = this.props.data;
    let check = this.props.check;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Information</div>
        <div className="panel-body">
          <div className="form-group">
            <label>Code</label>
            <EnText
              placeholder="Enter code..."
              value={data.code}
              onChange={this.codeChange.bind(this)} />
          </div>

          <div className={check? 'form-group has-error': 'form-group'}>
            <label>Name</label>
            <EnText
              placeholder="Enter name..."
              value={data.content.main.name}
              onChange={this.nameChange.bind(this)} />
          </div>
        </div>
    </div>
  );
  }
}

export class SizeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.props.ma_size.getItem(id);
    } else {
      this.props.ma_size.resetItem();
    }
  }

  onSave() {
    if (this.data.name === '') {
      this.setState({check: true});
    } else {
      this.props.ma_size.saveItem();
    }
  }

  render() {
    let size = this.props.ma_size.toJS();
    this.data = size.data;
    return (
      <div className="container-fluid">
        <EnHeader name="Size Information"/>
        <CompleteSection close={'/size'} save={this.onSave.bind(this)} />

        <div className="row">
          <div className="col-md-6 col-lg-6">
            <Information
              data={this.data}
              check={this.state.check}
              {...this.props} />
          </div>

          <div className="col-md-6 col-lg-6">
            <EcommerceLazada data={this.data} {...this.props} />
          </div>
        </div>

      </div>
    );
  }
}

export default inject('ma_size')(observer(SizeItem));
