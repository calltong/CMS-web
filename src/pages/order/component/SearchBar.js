import React from 'react';
import {observer, inject} from 'mobx-react';
import Select from 'react-select';

import EnButton from '../../forms/button/EnButton';

export class SearchBar extends React.Component {
  typeChange(event) {
    this.condition.status = event.value;
    this.props.order.setCondition(this.condition);
  }

  codeChange(event) {
    this.condition.code = event.target.value;
    this.props.order.setCondition(this.condition);
  }

  find() {
    this.props.order.getList();
  }

  render() {
    let list = [
      {value: '', label: 'ทั้งหมด'},
      {value: 'created', label: 'สั่งซื้อสินค้า'},
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

    let order = this.props.order.toJS();
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

export default inject('order')(observer(SearchBar));
