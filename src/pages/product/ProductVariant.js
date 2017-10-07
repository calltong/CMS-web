import React from 'react';
import Select from 'react-select';

import {actions} from '../../actions/Action';
import EnNumberText from '../../forms/EnNumberText';
import RemoveButton from '../../forms/button/RemoveButton';
import {box} from '../../utility/MessageBox';

import ProductImage from './ProductImage';
import ProductSquareImage from './ProductSquareImage';

class ProductSize extends React.Component {
  async sizeAdd(event) {
    let value = event.value;
    let variant = this.props.variant;

    let size = this.props.size_list.find(item => {
      return item._id === value;
    });

    let found = await variant.list.find(item => {
      return item.size._id === value;
    });

    if (found) {
      box.Display('ขนาดสินที่ท่านเลือกมีอยู่แล้ว');
      actions.product.refresh();
    } else {
      variant.list.push({size: size, quantity: 0});
      actions.product.setVariant(this.props.index, variant);
    }
  }

  async sizeChange(index, event) {
    let value = event.value;
    let variant = this.props.variant;
    let size = this.props.size_list.find(item => {
      return item._id === value;
    });

    let found = await variant.list.find(item => {
      return item.size._id === value;
    });

    if (found) {
      box.Display('ขนาดสินที่ท่านเลือกมีอยู่แล้ว');
      actions.product.refresh();
    } else {
      variant.list[index].size = size;
      actions.product.setVariant(this.props.index, variant);
    }
  }

  quantityChange(index, event) {
    let value = event.target.value;
    let val = parseInt(value, 10);
    let variant = this.props.variant;
    variant.list[index].quantity = val? val: 0;
    actions.product.setVariant(this.props.index, variant);
  }

  onDelete(index) {
    let variant = this.props.variant;
    let varIndex = this.props.index;
    box.DisplayConfirm(
      'ยืนยันการลบ!',
      function() {
        variant.list.splice(index, 1);
        actions.product.setVariant(varIndex, variant);
      }
    );
  }

  colorChange(val) {
    let index = this.props.colors.findIndex(item => {
      return item.value === val.value;
    });
    actions.product.selectVariant(index);
  }

  onEditColor(color, item) {
    actions.product.editVariant(item, color);
  }

  getColorToEdit() {
    actions.dialog.resetColor();
    actions.dialog.setConfirmColor(this.onEditColor, this.props.index, this.props.colors);
  }

  removeColor() {
    box.DisplayConfirm(
      'ยืนยันการลบ!',
      function() {
        actions.product.removeVariant(this.props.index);
      }
    );
  }

  render() {
    let sizes = this.props.sizes;
    let colors = this.props.colors;
    let variant = this.props.variant;
    let list = variant.list.map((item, index) => {
      let id = item.size._id;
      return (
      <tr key={id}>
        <td>
          <Select
            clearable={false}
            searchable={false}
            value={id}
            options={sizes}
            onChange={this.sizeChange.bind(this, index)} />
        </td>
        <td>
          <EnNumberText
            value={item.quantity}
            onChange={this.quantityChange.bind(this, index)}/>
        </td>
        <td style={{textAlign: 'center'}}>
          <RemoveButton onClick={this.onDelete.bind(this, index)} />
        </td>
      </tr>);
    });
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
                options={colors}
                onChange={this.colorChange.bind(this)} />
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group" >
              <button
                className="btn btn-normal"
                style={{width: '100%', marginTop: '25px'}}
                data-toggle="modal" data-target="#choose_color"
                onClick={this.getColorToEdit.bind(this)}>
                <i className="fa fa-pencil" /> แก้ไขสี
              </button>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group" >
              <RemoveButton
                style={{width: '100%', marginTop: '25px'}}
                onClick={this.removeColor.bind(this)}>
                 ลบสี
              </RemoveButton>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-6">
            <table className="table table-size">
              <thead className="thead-default">
                <tr>
                  <th className="col-md-4">ขนาด</th>
                  <th className="col-md-4">จำนวนสินค้า</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                {list}
                <tr>
                  <td>
                    <Select
                      clearable={false}
                      searchable={false}
                      options={sizes}
                      onChange={this.sizeAdd.bind(this)} />
                  </td>
                  <td/>
                  <td/>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default class ProductVariant extends React.Component {
  render() {
    let variant = this.props.variant;
    return (
      <div>
        <ProductSize {...this.props} />
        <br />
        <ProductImage index={this.props.index} data={variant.image_list} />
        <ProductSquareImage index={this.props.index} data={variant.image_sq_list} />
      </div>
    );
  }
}
