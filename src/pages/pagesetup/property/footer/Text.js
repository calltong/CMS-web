import React from 'react';
import Select from 'react-select';

import EnTextArea from '../../../../forms/EnTextArea';
import {actions} from '../../../../actions/Action';

export default class Text extends React.Component {
  typeChange(value) {
    let item = this.item;
    let index = this.props.index;
    item.type = value.value;
    item.value = '';
    actions.footerPage.setSubItem(index.level_2, index.level_3, item);
  }

  textChange(event) {
    let item = this.item;
    let index = this.props.index;
    item.value = event.target.value;

    actions.footerPage.setSubItem(index.level_2, index.level_3, item);
  }

  render() {
    let options = [
      {value: 'text', label: 'ข้อความ'},
      {value: 'mobile', label: 'เบอร์โทรศัพท์'},
      {value: 'email', label: 'Email'},
    ];
    this.item = this.props.data;
    let data = this.item;
    return (
      <div>
        <div className="form-group">
          <label>ชนิด</label>
          <Select
            clearable={false}
            searchable={false}
            value={data.type}
            options={options}
            onChange={this.typeChange.bind(this)} />
        </div>
        <div className="form-group">
          <label>ข้อความ</label>
          <EnTextArea
            value={data.value}
            onChange={this.textChange.bind(this)}
            rows={2}
            placeholder="ข้อความ.." />
        </div>
      </div>
    );
  }
}
