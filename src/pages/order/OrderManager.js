import React, { Component } from 'react';
import {Link} from 'react-router';

import {toMoney, toNumber, toDate, toOrderStatus} from '../../utility/Display';

import OrderSearchBar from './OrderSearchBar';
import EnHeader from '../../forms/EnHeader';

class OrderTable extends Component {
  render() {
    let cssC = {
      textAlign: 'center',
    };
    let cssR = {
      textAlign: 'right',
    };
    let list = this.props.data.list;
    let rows = list.map((item, i) => {
      let index = item.status_list.length;
      let created = item.status_list[0];
      let tracking = item.status_list[index - 1];
      let sum = 0;
      for (let order of item.list) {
        sum += order.quantity;
      }
      return (
      <tr key={i}>
        <td>{item.shipping.name}</td>
        <td style={cssR}>{toMoney(item.summary.total)}</td>
        <td style={cssR}>{toNumber(sum)}</td>
        <td style={cssC}>{toDate(created.updated_at)}</td>
        <td style={cssC}>{toDate(tracking.updated_at)}</td>
        <td style={cssC}>{toOrderStatus(tracking.status)}</td>
        <td style={cssC}>
          <div>
            <Link to={`order/${item._id}`} className="btn btn-normal">
              <i className="fa fa-file-code-o" />
            </Link>
          </div>
        </td>
      </tr>
    );
    });


    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th style={cssC}>ชื่อลูกค้า</th>
            <th style={cssC}>ยอดเงิน</th>
            <th style={cssC}>จำนวนสินค้า</th>
            <th style={cssC}>วันที่สั่งซื้อ</th>
            <th style={cssC}>วันที่ update</th>
            <th style={cssC}>สถานะการสั่งซื้อ</th>
            <th style={cssC}>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export class OrderManager extends Component {
  componentDidMount() {
    actions.order.getList();
  }

  render() {
    let order = store.getState().order;
    return (
      <div className="container-fluid">
        <EnHeader name="รายการสั่งซื้อ"/>
        <div className="row">
          <div className="col-md-10">
            <SearchBar />
          </div>
        </div>
        <hr/>

        <div className="row">
          <div className="col-md-10">
            <div className="table-responsive">
              <OrderTable data={order} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderManager;
