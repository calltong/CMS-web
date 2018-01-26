import React from 'react';
import {observer, inject} from 'mobx-react';
import Select from 'react-select';

import EnNumberText from '../../forms/EnNumberText';
import RemoveButton from '../../forms/button/RemoveButton';
import {box} from '../../utility/MessageBox';

export class ProductSize extends React.Component {
  componentDidMount() {
    this.props.ma_size.getList(false);
  }

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
      this.props.ma_product.refresh();
    } else {
      variant.list.push({size: size, quantity: 0});
      this.props.ma_product.setVariant(this.props.index, variant);
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
      this.props.ma_product.refresh();
    } else {
      variant.list[index].size = size;
      this.props.ma_product.setVariant(this.props.index, variant);
    }
  }

  quantityChange(index, event) {
    let value = event.target.value;
    let val = parseInt(value, 10);
    let variant = this.props.variant;
    variant.list[index].quantity = val? val: 0;
    this.props.ma_product.setVariant(this.props.index, variant);
  }

  onDelete(index) {
    let variant = this.props.variant;
    let varIndex = this.props.index;
    box.DisplayConfirm(
      'ยืนยันการลบ!',
      function() {
        variant.list.splice(index, 1);
        this.props.ma_product.setVariant(varIndex, variant);
      }
    );
  }

  render() {
    let size = this.props.ma_size.toJS();
    console.log('size:', size);
    this.size = size;
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
            options={size.select_list}
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
                      options={size.select_list}
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

export default inject('ma_product', 'ma_size')(observer(ProductSize));
