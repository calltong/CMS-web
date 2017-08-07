import React from 'react';
import Select from 'react-select';

import EnTextArea from '../../../../forms/EnTextArea';
import {actions} from '../../../../actions/Action';

export default class Social extends React.Component {
  typeChange(value) {
    let item = this.item;
    let index = this.props.index;
    item.type = value.value;
    item.url = '';
    actions.footerPage.setSubItem(index.level_2, index.level_3, item);
  }

  urlChange(event) {
    let item = this.item;
    let index = this.props.index;
    item.url = event.target.value;

    actions.footerPage.setSubItem(index.level_2, index.level_3, item);
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
