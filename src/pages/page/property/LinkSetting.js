import React from 'react';
import Select from 'react-select';

import EnText from '../../../forms/EnText';
import {actions} from '../../../actions/Action';
import {store} from '../../../store';

export default class LinkSetting extends React.Component {
  constructor() {
    super();
    let product = store.getState().product;
    let type_list = product.type_list;
    let types = type_list.map(type => {
      return {value: type._id, label: type.name, clearableValue: false};
    });

    let size_list = product.size_list;
    let sizes = size_list.map(type => {
      return {value: type._id, label: type.name, clearableValue: false};
    });

    this.state = {
      types,
      sizes,
    };
  }

  typeChange(value) {
    let item = this.props.item;
    item.type = value.value;
    item.value = '';
    this.props.onChange(this.props.index, item);
  }

  listChange(event) {
    let item = this.props.item;
    item.value = event === null ? '' : event.value;
    this.props.onChange(this.props.index, item);
  }

  tagChange(event) {
    let item = this.props.item;
    item.value = event.target.value;
    this.props.onChange(this.props.index, item);
  }

  getProduct() {
    let data = {
      index: this.props.index,
      item: this.props.item,
    };
    actions.dialog.setConfirmProduct(this.props.selectProduct, data);
  }

  getLinkContent(item) {
    switch (item.type) {
      case 'category':
        return (
          <Select
            clearable={true}
            searchable={false}
            value={item.value}
            options={this.state.types}
            onChange={this.listChange.bind(this)} />);
      case 'size':
        return (
          <Select
            clearable={true}
            searchable={false}
            value={item.value}
            options={this.state.sizes}
            onChange={this.listChange.bind(this)} />);
      case 'product':
        return (
          <button
            className="btn btn-normal"
            style={{width: '100%'}}
            value={item.value}
            data-toggle="modal" data-target="#choose_product"
            onClick={this.getProduct.bind(this)}>
            <i className="fa fa-external-link" /> เลือกสินค้า
          </button>);
      case 'tag':
        return (
          <EnText
            placeholder="Enter tag..."
            value={item.value || ''}
            onChange={this.tagChange.bind(this)} />);
      default:
        return (<EnText readOnly={true} />);
    }
  }


  render() {
    let options = [
      {value: 'none', label: 'ไม่ใช้งาน'},
      {value: 'all', label: 'แสดงทั้งหมด'},
      {value: 'category', label: 'ประเภทสินค้า'},
      {value: 'size', label: 'ขนาดสินค้า'},
      {value: 'product', label: 'สินค้า'},
      {value: 'tag', label: 'Tag'},
    ];

    let item = this.props.item;
    let valButton = this.getLinkContent(item);

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>ประเภท Link</label>
            <Select
              clearable={false}
              searchable={false}
              value={item.type}
              options={options}
              onChange={this.typeChange.bind(this)} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Link</label>
            {valButton}
          </div>
        </div>
      </div>
    );
  }
}
