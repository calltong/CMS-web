import React from 'react';
import {observer, inject} from 'mobx-react';
import TagsInput from 'react-tagsinput';
import Select from 'react-select';

import {manager} from '../../utility/Manager';

import EnText from '../../forms/EnText';
import EnNumberText from '../../forms/EnNumberText';
import EnTextArea from '../../forms/EnTextArea';
import EnButton from '../../forms/button/EnButton';

export class BasicInfo extends React.Component {
  componentDidMount() {
    this.props.ma_type.getList(false);
  }

  codeGenerate() {
    let data = this.data;
    data.code = manager.GenerateId();
    this.props.ma_product.setItem(data);
  }

  codeChange(event) {
    let data = this.data;
    data.code = event.target.value;
    this.props.ma_product.setItem(data);
  }

  nameChange(event) {
    let data = this.data;
    data.content.main.name = event.target.value;
    this.props.ma_product.setItem(data);
  }

  infoChange(event) {
    let data = this.data;
    data.content.main.description = event.target.value;
    this.props.ma_product.setItem(data);
  }

  contentChange(event) {
    let data = this.data;
    data.content.main.package_content = event.target.value;
    this.props.ma_product.setItem(data);
  }

  conditionChange(event) {
    let data = this.data;
    data.content.main.condition = event.target.value;
    this.props.ma_product.setItem(data);
  }

  priceChange(event) {
    let data = this.data;
    let val = parseInt(event.target.value, 10);
    data.price = val? val: 0;
    this.props.ma_product.setItem(data);
  }

  salePriceChange(event) {
    let data = this.data;
    let val = parseInt(event.target.value, 10);
    data.sale_price = val? val: 0;
    this.props.ma_product.setItem(data);
  }

  typeChange(event) {
    let data = this.data;
    data.type_id = event.value;
    this.props.ma_product.setItem(data);
  }

  tagsChange(list) {
    let data = this.data;
    data.tag_list = list;
    this.props.ma_product.setItem(data);
  }

  videoChange(event) {
    let data = this.data;
    data.video = event.target.value;
    this.props.ma_product.setItem({data});
  }

  render() {
    let product = this.props.ma_product.toJS();
    let ecommerce = product.ecommerce;
    let data = product.data;
    this.data = data;

    let type = this.props.ma_type.toJS();
    let typeList = type.select_list;
    return (
      <div>
        <div className="row">
          <div className="col-sm-2 col-md-6">
            <div className="form-group">
              <label>รหัส</label>
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
              <label>ราคา</label>
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
              <label>ราคา Sale</label>
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
          <div className="col-sm-6 col-md-3">
            <div className={false? 'form-group has-error': 'form-group'} >
              <label>ชื่อ</label>
              <EnText
                placeholder="Name..."
                value={data.content.main.name}
                onChange={this.nameChange.bind(this)} />
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="form-group">
              <label>ชนิดสินค้า</label>
              <Select
                clearable={false}
                searchable={false}
                value={data.type_id}
                options={typeList}
                onChange={this.typeChange.bind(this)} />
            </div>
          </div>

          <div className="col-sm-6 col-md-6">
            <div className="form-group">
              <label>Tags</label>
              <TagsInput
                ref="tag_list"
                value={data.tag_list? data.tag_list: []}
                onChange={this.tagsChange.bind(this)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="form-group">
              <label>รายละเอียดสินค้า</label>
              <EnTextArea
                placeholder="รายละเอียดสินค้า..."
                rows="8"
                value={data.content.main.description}
                onChange={this.infoChange.bind(this)}/>
            </div>
          </div>

          <div className="col-sm-6 col-md-6">
            <div className="form-group">
              <label>เงื่อนไข</label>
              <EnTextArea
                placeholder="เงื่อนไข..."
                rows="4"
                value={data.content.main.condition}
                onChange={this.conditionChange.bind(this)}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="form-group">
              <label>สินค้าในกล่อง</label>
              <EnTextArea
                placeholder="สินค้าในกล่อง..."
                rows="4"
                value={data.content.main.package_content}
                onChange={this.contentChange.bind(this)}/>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="form-group">
              <label>Video Link</label>
              <EnText
                value={data.video}
                placeholder="Youtube Link..."
                onChange={this.videoChange.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('ma_product', 'ma_type')(observer(BasicInfo));
