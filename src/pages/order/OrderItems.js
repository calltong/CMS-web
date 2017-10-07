import React from 'react';

import EnImage from '../../forms/EnImage';
import {toMoney} from '../../utility/Display';

export default class OrderItems extends React.Component {
  render() {
    let cssCenter = {textAlign: 'center'};
    let data = this.props.data;
    let quantity = 0;
    let rows = data.list.map((item, index) => {
      quantity += item.quantity;
      return (
        <tr key={index}>
          <td>
            <div style={cssCenter}>
              <EnImage className="product-img" src={item.image} />
            </div>
          </td>
          <td>{item.name}</td>
          <td>{item.color}</td>
          <td>{item.size}</td>
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
              <th width="80">สี</th>
              <th width="80">ขนาด</th>
              <th className="text-right" width="80">จำนวน</th>
              <th className="text-right" width="120">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <td />
              <td />
              <td />
              <td><strong className="focus-text">รวม</strong></td>
              <td className="text-right"><strong className="focus-text">{quantity}</strong></td>
              <td className="text-right"><strong className="focus-text">{data.summary.total.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}
