import React from 'react';

import EnText from '../../../../forms/EnText';
import LinkSetting from '../LinkSetting';

import {actions} from '../../../../actions/Action';

export default class ItemProperty extends React.Component {
  nameChange(event) {
    let data = this.props.data;
    data.name = event.target.value;
    actions.menuPage.setItem(this.props.index, data);
  }

  onChange(index, item) {
    actions.menuPage.setItem(index, item);
  }

  render() {
    let item = this.props.data;
    return (
      <div>
        <div className="form-group">
          <label>ชื่อเมนู</label>
          <EnText
            value={item.name}
            onChange={this.nameChange.bind(this)}
            placeholder="ชื่อเมนู.." />
        </div>

        <LinkSetting
          onChange={this.onChange}
          index={this.props.index}
          item={item} />
      </div>
    );
  }
}
