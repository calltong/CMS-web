import React from 'react';
import {observer, inject} from 'mobx-react';
import Select from 'react-select';

import ProductSize from './ProductSize';
import ProductImage from './ProductImage';
import ProductSquareImage from './ProductSquareImage';
import {box} from '../../utility/MessageBox';
import RemoveButton from '../../forms/button/RemoveButton';

export class ProductVariant extends React.Component {
  colorChange(val) {
    let index = this.colors.findIndex(item => {
      return item.value === val.value;
    });
    this.props.ma_product.selectVariant(index);
  }

  onEditColor(item) {
    //this.props.ma_product.editVariant(this.state.index, item);
  }

  removeColor(index) {
    let store = this.props.ma_product;
    box.DisplayConfirm(
      'ยืนยันการลบ!',
      function() {
        store.removeVariant(index);
      }
    );
  }

  render() {
    let product = this.props.ma_product.toJS();
    let edit = product.edit;
    let index = edit.variant.index;
    this.colors = edit.colors;
    let variant = {
      color: {},
      list: [],
      image_list: [],
      image_sq_list: [],
    };
    if (index >= 0) {
      variant = edit.variant.data;
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <div className="form-group" >
              <label>สีสินค้า</label>
              <Select
                clearable={false}
                searchable={false}
                value={variant.color._id}
                options={edit.colors}
                onChange={this.colorChange.bind(this)} />
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group" >
              <button
                className="btn btn-normal"
                style={{width: '100%', marginTop: '25px'}}
                data-toggle="modal" data-target="#choose_color">
                <i className="fa fa-pencil" /> แก้ไขสี
              </button>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group" >
              <RemoveButton
                style={{width: '100%', marginTop: '25px'}}
                onClick={this.removeColor.bind(this, index)}>
                 ลบสี
              </RemoveButton>
            </div>
          </div>

        </div>
        <ProductSize
          index={index}
          variant={variant} />
        <br />
        <ProductImage
          index={index}
          size={{title: '15x10', height: '255px', width: '170px'}}
          list={variant.image_list} />
        <ProductSquareImage
          index={index}
          list={variant.image_sq_list} />
      </div>
    );
  }
}

export default inject('ma_product')(observer(ProductVariant));
