import React from 'react';
import Select from 'react-select';

import EnTextArea from '../../../../forms/EnTextArea';
import {actions} from '../../../../actions/Action';

export default class Text extends React.Component {
  typeChange(value) {
    let item = this.item;
    item.type = value.value;
    item.value = '';
    actions.page.footer.setSubItem(this.props.index, this.props.level_2, item);
  }

  textChange(event) {
    let item = this.item;
    item.value = event.target.value;

    actions.page.footer.setSubItem(this.props.index, this.props.level_2, item);
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
