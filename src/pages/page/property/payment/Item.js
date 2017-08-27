import React from 'react';
import Select from 'react-select';

import EnText from '../../../../forms/EnText';
import {actions} from '../../../../actions/Action';

export default class Item extends React.Component {
  bankChange(event) {
    this.data.name = event.target.value;
    actions.page.payment.setItem(this.props.index, this.data);
  }

  nameChange(event) {
    this.data.name = event.target.value;
    actions.page.payment.setItem(this.props.index, this.data);
  }

  numberChange(event) {
    this.data.number = event.target.value;
    actions.page.payment.setItem(this.props.index, this.data);
  }

  render() {
    this.data = this.props.data;
    let data = this.data;
    let banks = [
      {value: 'scb', label: '‎ไทยพาณิชย์', clearableValue: false},
      {value: 'kbank', label: 'กสิกรไทย', clearableValue: false},
      {value: 'bbl', label: 'กรุงเทพฯ', clearableValue: false},
      {value: 'bay', label: 'กรุงศรีอยุธยา', clearableValue: false},
    ];
    return (
      <div>
        <div className="form-group">
          <label>ธนาคาร</label>
          <Select
            clearable={false}
            searchable={false}
            value={data.bank}
            options={banks}
            onChange={this.bankChange.bind(this)} />
        </div>
        <div className="form-group">
          <label>ชื่อ</label>
          <EnText
            value={data.name}
            onChange={this.nameChange.bind(this)}
            placeholder="ชื่อ.." />
        </div>
        <div className="form-group">
          <label>เลขที่บัญชี</label>
          <EnText
            value={data.number}
            onChange={this.numberChange.bind(this)}
            placeholder="เลขที่บัญชี.." />
        </div>
      </div>
    );
  }
}
