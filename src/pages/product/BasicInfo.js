import React from 'react';
import TagsInput from 'react-tagsinput';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';
import {manager} from '../../utility/Manager';

import EnText from '../../forms/EnText';
import EnNumberText from '../../forms/EnNumberText';
import EnTextArea from '../../forms/EnTextArea';
import EnButton from '../../forms/EnButton';
import AddButton from '../../forms/AddButton';
import RemoveButton from '../../forms/RemoveButton';
import EnListBox from '../../forms/EnListBox';

export class BasicInfo extends ReducerBase {

  codeGenerate() {
    let data = this.data;
    data.code = manager.GenerateId();
    actions.product.setItem(data);
  }

  codeChange(event) {
    let data = this.data;
    data.code = event.target.value;
    actions.product.setItem(data);
  }

  nameChange(event) {
    let data = this.data;
    data.name = event.target.value;
    actions.product.setItem(data);
  }

  infoChange(event) {
    let data = this.data;
    data.information.value = event.target.value;
    actions.product.setItem(data);
  }

  contentChange(event) {
    let data = this.data;
    data.information.package_content = event.target.value;
    actions.product.setItem(data);
  }

  priceChange(event) {
    let data = this.data;
    let val = parseInt(event.target.value, 10);
    data.price = val? val: 0;
    actions.product.setItem(data);
  }

  salePriceChange(event) {
    let data = this.data;
    let val = parseInt(event.target.value, 10);
    data.sale_price = val? val: 0;
    actions.product.setItem(data);
  }

  typeChange(event) {
    let data = this.data;
    data.type_id = event.target.value;
    actions.product.setItem(data);
  }

  tagsChange(list) {
    let data = this.data;
    data.tag_list = list;
    actions.product.setItem(data);
  }

  colorsChange(list) {
    let data = this.data;
    data.color_list = list;
    actions.product.setItem(data);
  }

  videoChange(event) {
    let data = this.data;
    data.video = event.target.value;
    actions.product.setItem({data});
  }

  infoListChange(index, event) {
    let data = this.data;
    data.information.list[index] = event.target.value;
    actions.product.setItem(data);
  }

  onInfoListAdd() {
    let data = this.data;
    data.information.list.push('');
    actions.product.setItem(data);
  }

  onInfoListDelete(index) {
    let data = this.data;
    data.information.list.splice(index, 1);
    actions.product.setItem(data);
  }

  render() {
    let product = store.getState().product;
    let ecommerce = product.ecommerce;
    let data = product.data;
    this.data = data;
    let typeList = product.type_list.map(item => {
      return {id: item._id, text: item.name};
    });

    let index = 0;
    let infoList = data.information.list.map(item => {
      return (
        <div className="row" key={index} style={{marginTop:4}}>
          <div className="col-sm-10 col-md-10">
            <EnText
              value={item}
              onChange={this.infoListChange.bind(this, index)} />
          </div>
          <div className="col-sm-2 col-md-2">
            <RemoveButton onClick={this.onInfoListDelete.bind(this, index++)}/>
          </div>
        </div>
      );
    });

    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="row">
            <div className="col-sm-2 col-md-6">
              <div className="form-group">
                <label>Code</label>
                <div className="form-group input-group">
                  <EnText
                    placeholder="Enter code..."
                    value={data.code || ''}
                    readOnly={ecommerce.lazada || ecommerce.street}
                    onChange={this.codeChange.bind(this)} />
                  <span className="input-group-btn">
                    <EnButton
                      className="btn btn-default" type="button"
                      onClick={this.codeGenerate.bind(this)} >
                      <i className="fa fa-search"> Generate</i>
                    </EnButton>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-sm-2 col-md-2">
              <div className="form-group">
                <label>Price</label>
                <div className="form-group input-group">
                  <span className="input-group-addon">$</span>
                  <EnNumberText
                    placeholder="Enter price..."
                    value={data.price}
                    onChange={this.priceChange.bind(this)} />
                </div>
              </div>
            </div>

            <div className="col-sm-2 col-md-2">
              <div className="form-group">
                <label>Sale Price</label>
                <div className="form-group input-group">
                  <span className="input-group-addon">$</span>
                  <EnNumberText
                    placeholder="Enter price..."
                    value={data.sale_price}
                    onChange={this.salePriceChange.bind(this)} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className={false? 'form-group has-error': 'form-group'} >
                <label>Name</label>
                <EnText
                  placeholder="Enter Name..."
                  value={data.name}
                  onChange={this.nameChange.bind(this)} />
              </div>

              <div className="form-group">
                <label>Colors</label>
                <TagsInput
                  ref="color_list"
                  value={data.color_list?data.color_list:[]}
                  onChange={this.colorsChange.bind(this)} />
              </div>

            </div>

            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label>Type</label>
                <EnListBox
                  value={data.type_id}
                  data={typeList}
                  onSelect={this.typeChange.bind(this)}/>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <TagsInput
                  ref="tag_list"
                  value={data.tag_list?data.tag_list:[]}
                  onChange={this.tagsChange.bind(this)} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="form-group">
                <label>Video Link</label>
                <EnText
                  value={data.video}
                  placeholder="Youtube Link..."
                  onChange={this.videoChange.bind(this)} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label>Information</label>
                <EnTextArea
                  placeholder="Enter Information..."
                  rows="4"
                  value={data.information.value}
                  onChange={this.infoChange.bind(this)}/>
              </div>
            </div>

            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label>Product in Box</label>
                <EnTextArea
                  placeholder="Enter Content..."
                  rows="4"
                  value={data.information.package_content}
                  onChange={this.contentChange.bind(this)}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <AddButton onClick={this.onInfoListAdd.bind(this)} style={{marginTop:4, width:100}}/>
              {infoList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicInfo;
