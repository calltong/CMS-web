import React from 'react';

import EnTextArea from '../../../../forms/EnTextArea';
import {actions} from '../../../../actions/Action';

export default class Item extends React.Component {
  titleChange(event) {
    this.data.title = event.target.value;
    actions.orderConditionPage.setItem(this.props.index, this.data);
  }

  render() {
    this.data = this.props.data;
    let data = this.data;
    return (
      <div>
        <div className="form-group">
          <label>ข้อความ</label>
          <EnTextArea
            value={data.title}
            onChange={this.titleChange.bind(this)}
            rows={5}
            placeholder="ข้อความ.." />
        </div>
      </div>
    );
  }
}
