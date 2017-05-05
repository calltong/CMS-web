import React from 'react';
import TagsInput from 'react-tagsinput';

import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

class Information extends React.Component {

  codeChange(event) {
    let data = this.props.data;
    data.code = event.target.value;
    store.update('SIZE_STORE_ITEM', {data: data});
  }

  nameChange(event) {
    let data = this.props.data;
    data.name = event.target.value;
    store.update('SIZE_STORE_ITEM', {data: data});
  }

  tagsChange(tag_list) {
    let data = this.props.data;
    data.tag_list = tag_list;
    store.update('SIZE_STORE_ITEM', {data: data});
  }

  render() {
    let data = this.props.data;
    let check = this.props.check;
    return (
    <div>
      <div className="form-group">
        <label>Code</label>
        <EnText
          placeholder="Enter code..."
          value={data.code}
          onChange={this.codeChange.bind(this)} />
      </div>

      <div className={check? "form-group has-error": "form-group"}>
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
      store.update('SIZE_GET_ITEM', {id});
    } else {
      store.update('SIZE_RESET_ITEM');
    }
  }

  onSave() {
    let ob = store.getState().size;
    if (ob.data.name === '') {
      this.state.check = true;
      this.setState(this.state);
    } else {
      store.update('SIZE_SAVE_ITEM');
    }
  }

  render() {
    let state = this.state;
    let ob = store.getState().size;
    return (
      <div className="container-fluid">
        <EnHeader name="Size Information"/>
        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-heading">Information</div>
              <div className="panel-body">
                <Information
                  data={ob.data}
                  check={state.check}/>
              </div>
            </div>
          </div>
        </div>

        <CompleteSection close={`/SizeManager`} save={this.onSave.bind(this)} />
      </div>
    );
  }
}

export default SizeInfo;
