import React from 'react';
import Select from 'react-select';

import blank from '../../image/blank.png';
import WindowDialog from '../../forms/WindowDialog';
import EnImage from '../../forms/EnImage';
import FindButton from '../../forms/button/FindButton';

import {actions} from '../../actions/Action';
import {store} from '../../store';

class Menu extends React.Component {
  typeChange(val) {
    actions.product.selectType(val.value);
  }

  render() {
    let product = store.getState().product;
    let list = [{value: 0, label: 'สินค้าทั้งหมด'}];
    for (let item of product.type_list) {
      list.push(
        {value: item._id, label: item.name}
      );
    }

    return (
      <form className="form-inline">
        <div className="col-md-3" style={{paddingRight: 0, paddingLeft: 0}}>
          <Select
            clearable={false}
            searchable={false}
            value={product.page.condition.type_id}
            options={list}
            onChange={this.typeChange.bind(this)} />
        </div>
        <input
          className="form-control"
          placeholder="Enter Color.."
          style={{marginLeft:'4px', marginRight:'4px'}}/>

        <FindButton />
      </form>
    );
  }
}

export default class ChooseProductDialog extends React.Component {
  componentDidMount() {
    actions.product.getCountAndList(1);
  }

  selectProduct(product) {
    actions.dialog.selectProduct(product);
  }

  onConfirm() {
    let dialog = store.getState().dialog;
    if (dialog.product.confirm) {
      dialog.product.confirm(dialog.product.value, dialog.product.item);
    }
  }

  render() {
    let setting = {
      id: 'choose_product',
      title: 'เลือกสินค้า',
      confirm: 'ตกลง',
      close: 'ปิด',
      confirmDisabled: true,
    };
    let state = store.getState();
    let product = state.product;
    let page = product.page;
    let num = page.total / page.limit;
    let total = Math.ceil(num);
    if (total <= 1) {
      total = 1;
    }

    let productSelected = state.dialog.product;
    let selected = undefined;
    if (productSelected.value) {
      selected = productSelected.value._id;
      setting.confirmDisabled = false;
    }
    let css = {
      width: '100%',
      height: '100%',
    };
    let data_list = product.data_list;
    let list = data_list.map((item, index) => {
      let img = blank;
      if (item.image_list.length > 0) {
        img = item.image_list[0].data;
      } else if (item.image_square_list.length > 0) {
        img = item.image_square_list[0].data;
      }

      let cssCol = selected === item._id ? 'col-md-2 choose-product-selected' : 'col-md-2 choose-product';
      return (
        <div className={cssCol} key={index}>
          <EnImage onClick={this.selectProduct.bind(this, item)} style={css} src={img} />
        </div>
      );
    });
    return (
      <WindowDialog setting={setting} onConfirm={this.onConfirm.bind(this)}>
        <div className="row">
          <div className="col-md-12">
            <Menu />
          </div>
        </div>
        <hr />
        <div className="row">
          {list}
        </div>
      </WindowDialog>
    );
  }
}
