import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import TagsInput from 'react-tagsinput';

import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

class Information extends Component {
  nameChange(event) {
    let data = this.props.data;
    data.content.main.name = event.target.value;
    this.props.ma_type.setItem(data);
  }

  tagsChange(tag_list) {
    let data = this.props.data;
    data.tag_list = tag_list;
    this.props.ma_type.setItem(data);
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
          value={data.content.main.name}
          onChange={this.nameChange.bind(this)} />
      </div>

      <div className="form-group">
        <label>Tags</label>
        <TagsInput
          ref="tag_list"
          value={[]}
          onChange={this.tagsChange.bind(this)} />
      </div>
    </div>
  );
  }
}

class InformationEnglish extends Component {
  nameChange(event) {
    let data = this.props.data;
    data.content.english.name = event.target.value;
    this.props.ma_type.setItem(data);
  }

  render() {
    let data = this.props.data;
    return (
    <div>
      <div className="form-group">
        <label>Name</label>
        <EnText
          placeholder="Enter name..."
          value={data.content.english.name}
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
    this.props.ma_type.setItem(data);
  }

  modelChange(event) {
    let data = this.props.data;
    data.ecommerce.lazada.model = event.target.value;
    this.props.ma_type.setItem(data);
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

export class TypeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.props.ma_type.getItem(id);
    } else {
      this.props.ma_type.resetItem();
    }
  }

  onSave() {
    if (this.data.name === '') {
      this.setState({check: true});
    } else {
      this.props.ma_type.saveItem();
    }
  }

  render() {
    let state = this.state;
    this.data = this.props.ma_type.toJS().data;
    console.log('type:', this.data);
    return (
      <div className="container-fluid">
        <EnHeader name="Type Information"/>
        <CompleteSection close={'/type'} save={this.onSave.bind(this)} />
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">Information</div>
              <div className="panel-body">
                <Information
                  data={this.data}
                  check={state.check}
                  {...this.props} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">English Information</div>
              <div className="panel-body">
                <InformationEnglish
                  data={this.data}
                  check={state.check}
                  {...this.props} />
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
                 data={this.data}
                 {...this.props} />
             </div>
           </div>
         </div>
      </div>
     </div>
    );
  }
}

export default inject('ma_type')(observer(TypeItem));
