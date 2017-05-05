import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

class Information extends Component {

  nameChange(event) {
    let data = this.props.data;
    data.name = event.target.value;
    store.update('TYPE_STORE_ITEM', {data: data});
  }

  tagsChange(tag_list) {
    let data = this.props.data;
    data.tag_list = tag_list;
    store.update('TYPE_STORE_ITEM', {data: data});
  }

  render() {
    let data = this.props.data;
    let check = this.props.check;

    return (
    <div>
      <div className={check.name? "form-group has-error": "form-group"}>
        <label>Name</label>
        <EnText
          placeholder="Enter name..."
          value={data.name}
          onChange={this.nameChange.bind(this)} />
      </div>

      <div className="form-group">
        <label>Tags</label>
        <TagsInput
          ref="tag_list"
          value={data.tag_list}
          onChange={this.tagsChange.bind(this)} />
      </div>

    </div>
    )
  }
}

class InformationEnglish extends Component {

  nameChange(event) {
    let data = this.props.data;
    data.lang_eng.name = event.target.value;
    store.update('TYPE_STORE_ITEM', {data: data});
  }

  render() {
    let data = this.props.data;
    return (
    <div>
      <div className="form-group">
        <label>Name</label>
        <EnText
          placeholder="Enter name..."
          value={data.lang_eng.name}
          onChange={this.nameChange.bind(this)} />
      </div>
    </div>
    )
  }
}

export class TypeInfo extends ReducerBase {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      store.update('TYPE_GET_ITEM', {id});
    } else {
      store.update('TYPE_RESET_ITEM');
    }
  }

  onSave() {
    let ob = store.getState().type;
    if (ob.data.name === '') {
      this.state.check = true;
      this.setState(this.state);
    } else {
      store.update('TYPE_SAVE_ITEM');
    }
  }

  render() {
    let state = this.state;
    let ob = store.getState().type;
    return (
      <div className="container-fluid">
        <EnHeader name="Type Information"/>
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">Information</div>
              <div className="panel-body">
                <Information
                  data={ob.data}
                  check={state.check}/>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">English Information</div>
              <div className="panel-body">
                <InformationEnglish
                  data={ob.data}
                  check={state.check}/>
              </div>
            </div>
          </div>
       </div>

       <CompleteSection close={`/TypeManager`} save={this.onSave.bind(this)} />
     </div>
    );
  }
}

export default TypeInfo;
