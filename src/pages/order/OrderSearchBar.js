import React from 'react';
import Select from 'react-select';

import {store} from '../../store';
import {actions} from '../../actions/Action';
import EnButton from '../../forms/button/EnButton';

export class OrderSearchBar extends React.Component {
  typeChange(event) {
    this.condition.status = event.value;
    actions.order.setCondition(this.condition);
  }

  codeChange(event) {
    this.condition.code = event.target.value;
    actions.order.setCondition(this.condition);
  }

  find() {
    actions.order.getList();
  }

  render() {
    let list = [
      {value: '', label: 'ทั้งหมด'},
      {value: 'order', label: 'สั่งซื้อสินค้า'},
      {value: 'payment', label: 'ชำระเงินแล้ว'},
      {value: 'working', label: 'รอดำเนิดการ'},
      {value: 'shipping', label: 'จัดส่งสินค้า'},
      {value: 'completed', label: 'ลูกค้าได้รับสินค้า'},
      {value: 'reject', label: 'ยกเลิกคำสั่งซื้อ'},
    ];
    let css = {
      marginRight: '4px',
    };

    let cssList = {
      paddingRight: '0px',
      paddingLeft: '0px',
    };

    let order = store.getState().order;
    let condition = order.condition;
    this.condition = condition;
    return (
      <form className="form-inline">
        <div className="col-md-2" style={cssList}>
          <Select
            clearable={false}
            searchable={false}
            value={condition.status}
            options={list}
            onChange={this.typeChange.bind(this)} />
        </div>

        <input
          className="form-control"
          placeholder="รหัสสั่งซื้อ"
          style={css}
          value={condition.code}
          onChange={this.codeChange.bind(this)} />

        <EnButton
          className="btn btn-menu btn-normal"
          style={css}
          onClick={this.find.bind(this)}>
          <i className="fa fa-search" /> ค้นหา
        </EnButton>
      </form>
    );
  }
}

export default OrderSearchBar;
