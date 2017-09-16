import React from 'react';

import EnImage from '../../forms/EnImage';
import {toMoney} from '../../utility/Display';

export default class OrderItems extends React.Component {
  render() {
    let cssCenter = {textAlign: 'center'};
    let data = this.props.data;
    let quantity = 0;
    let rows = data.product_list.map((item, index) => {
      quantity += item.quantity;
      let image;
      if (item.product.image_list.length > 0) {
        image = item.product.image_list[0].data;
      }
      return (
        <tr key={index}>
          <td>
            <div style={cssCenter}>
              <EnImage className="product-img" src={image} />
            </div>
          </td>
          <td>{item.product.name}</td>
          <td>{item.size.name}</td>
          <td className="text-right">{item.quantity}</td>
          <td className="text-right">{toMoney(item.price)}</td>
        </tr>
      );
    });

    return (
      <div>
        <div className="order-header">
          <p>รายการสินค้า</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th style={cssCenter} width="90">สินค้า</th>
              <th>ชื่อ</th>
              <th width="80">ขนาด</th>
              <th className="text-right" width="80">จำนวน</th>
              <th className="text-right" width="80">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <td />
              <td />
              <td><strong>รวม</strong></td>
              <td className="text-right">{quantity}</td>
              <td className="text-right">{data.summary.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}
