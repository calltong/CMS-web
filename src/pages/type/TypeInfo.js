import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

class Information extends Component {

  nameChange(event) {
    let data = this.props.data;
    data.name = event.target.value;
    actions.type.setItem(data);
  }

  tagsChange(tag_list) {
    let data = this.props.data;
    data.tag_list = tag_list;
    actions.type.setItem(data);
  }

  render() {
    let data = this.props.data;
    let check = this.props.check;

    return (
    <div>
      <div className={check.name? 'form-group has-error': 'form-group'}>
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
  );
  }
}

class InformationEnglish extends Component {

  nameChange(event) {
    let data = this.props.data;
    data.lang_eng.name = event.target.value;
    actions.type.setItem(data);
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
  );
  }
}

class EcommerceLazada extends Component {

  idChange(event) {
    let data = this.props.data;
    data.ecommerce.lazada.category_id = +event.target.value;
    actions.type.setItem(data);
  }

  modelChange(event) {
    let data = this.props.data;
    data.ecommerce.lazada.model = event.target.value;
    actions.type.setItem(data);
  }

  render() {
    let data = this.props.data;
    return (
    <div>
      <div className="form-group">
        <label>Category</label>
        <EnText
          placeholder="Enter name..."
          value={data.ecommerce.lazada.category_id}
          onChange={this.idChange.bind(this)} />
      </div>
      <div className="form-group">
        <label>Model</label>
        <EnText
          placeholder="Enter name..."
          value={data.ecommerce.lazada.model}
          onChange={this.modelChange.bind(this)} />
      </div>
    </div>
  );
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
      actions.type.getItem(id);
    } else {
      actions.type.resetItem();
    }
  }

  onSave() {
    let ob = store.getState().type;
    if (ob.data.name === '') {
      this.state.check = true;
      this.setState(this.state);
    } else {
      actions.type.saveItem();
    }
  }

  render() {
    let state = this.state;
    let type = store.getState().type;
    return (
      <div className="container-fluid">
        <EnHeader name="Type Information"/>
        <CompleteSection close={'/TypeManager'} save={this.onSave.bind(this)} />
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">Information</div>
              <div className="panel-body">
                <Information
                  data={type.data}
                  check={state.check}/>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">English Information</div>
              <div className="panel-body">
                <InformationEnglish
                  data={type.data}
                  check={state.check}/>
              </div>
            </div>
          </div>
       </div>

       <div className="row">
         <div className="col-md-6">
           <div className="panel panel-default">
             <div className="panel-heading">Lazada</div>
             <div className="panel-body">
               <EcommerceLazada
                 data={type.data} />
             </div>
           </div>
         </div>
      </div>
     </div>
    );
  }
}

export default TypeInfo;
