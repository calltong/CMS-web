import React from 'react';
import Select from 'react-select';

import EnTextArea from '../../../../forms/EnTextArea';
import {actions} from '../../../../actions/Action';

export default class Social extends React.Component {
  typeChange(value) {
    let item = this.item;
    item.type = value.value;
    item.url = '';
    actions.page.footer.setSubItem(this.props.index, this.props.level_2, item);
  }

  urlChange(event) {
    let item = this.item;
    item.url = event.target.value;

    actions.page.footer.setSubItem(this.props.index, this.props.level_2, item);
  }

  render() {
    let options = [
      {value: 'facebook', label: 'Facebook'},
      {value: 'instagram', label: 'Instagram'},
      {value: 'line', label: 'Line'},
      {value: 'youtube', label: 'Youtube'},
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
          <label>link</label>
          <EnTextArea
            value={data.url}
            onChange={this.urlChange.bind(this)}
            rows={5}
            placeholder="ข้อความ.." />
        </div>
      </div>
    );
  }
}
