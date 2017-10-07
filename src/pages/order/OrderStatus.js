import React from 'react';
import {toOrderStatus, toDate} from '../../utility/Display';

export default class OrderStatus extends React.Component {

  render() {
    let data = this.props.data;
    let len = data.status_list.length - 1;
    let rows = data.status_list.map((item, index) => {
      if (index === len) {
        return (
          <tr key={index}>
            <td><strong className="focus-text">{toOrderStatus(item.status)}</strong></td>
            <td><strong className="focus-text">{toDate(item.updated_at)}</strong></td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td>{toOrderStatus(item.status)}</td>
            <td>{toDate(item.updated_at)}</td>
          </tr>
        );
      }
    });

    return (
      <div>
        <div className="order-header">
          <p>บันทึกสถานะการสั่งซื้อ</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>สถานะ</th>
              <th>วันที่</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

}
