import React from 'react';

export default class OrderItems extends React.Component {

  render() {
    let items = this.props.items;
    let index = 0;
    let rows = items.map(item => {
      let detail = item.variant.product.details[0];
      return (
        <tr key={index++}>
          <td>{detail.name}</td>
          <td className="text-right">{item.amount}</td>
          <td className="text-right">{item.variant.price.toFixed(2)}</td>
        </tr>
      );
    });

    let total = 0;
    items.forEach(item => total += item.variant.price);

    return (
      <div className="panel panel-default">
        <div className="panel-heading">รายการสั่งซื้อสินค้า</div>

        <table className="table">
          <thead>
            <tr>
              <th>ชื่อสินค้า</th>
              <th className="text-right">จำนวน</th>
              <th className="text-right" width="120">ราคา</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>

        <div className="panel-body text-right">
          <strong>ราคารวม:</strong> {`${total.toFixed(2)}`}
        </div>
      </div>
    );
  }

}
