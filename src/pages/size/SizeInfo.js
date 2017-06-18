import React from 'react';

import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

class EcommerceLazada extends React.Component {
  nameChange(event) {
    let data = this.props.data;
    data.ecommerce.lazada.code = event.target.value;
    actions.size.setItem(data);
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
    actions.size.setItem(data);
  }

  nameChange(event) {
    let data = this.props.data;
    data.name = event.target.value;
    actions.size.setItem(data);
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
              value={data.name}
              onChange={this.nameChange.bind(this)} />
          </div>
        </div>
    </div>
  );
  }
}

export class SizeInfo extends ReducerBase {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      actions.size.getItem(id);
    } else {
      actions.size.resetItem();
    }
  }

  onSave() {
    let size = store.getState().size;
    if (size.data.name === '') {
      this.state.check = true;
      this.setState(this.state);
    } else {
      actions.size.saveItem();
    }
  }

  render() {
    let state = this.state;
    let size = store.getState().size;
    return (
      <div className="container-fluid">
        <EnHeader name="Size Information"/>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <Information
              data={size.data}
              check={state.check}/>
          </div>

          <div className="col-md-6 col-lg-6">
            <EcommerceLazada data={size.data} />
          </div>
        </div>

        <CompleteSection close={'/SizeManager'} save={this.onSave.bind(this)} />
      </div>
    );
  }
}

export default SizeInfo;
