import React from 'react';

import EnText from '../../../../forms/EnText';
import EnTextArea from '../../../../forms/EnTextArea';
import {actions} from '../../../../actions/Action';

export default class TitleProperty extends React.Component {
  titleChange(event) {
    this.data.data.title = event.target.value;
    actions.footerPage.setItem(this.props.index, this.data);
  }

  descriptionChange(event) {
    this.data.data.description = event.target.value;
    actions.footerPage.setItem(this.props.index, this.data);
  }

  render() {
    this.data = this.props.data;
    let data = this.data.data;
    return (
      <div>
        <div className="form-group">
          <label>ข้อความ</label>
          <EnText
            value={data.title}
            onChange={this.titleChange.bind(this)}
            placeholder="ข้อความ.." />
        </div>
        <div className="form-group">
          <label>ข้อความเพิ่มเติม</label>
          <EnTextArea
            value={data.description}
            onChange={this.descriptionChange.bind(this)}
            rows={5}
            placeholder="ข้อความเพิ่มเติม.." />
        </div>
      </div>
    );
  }
}
