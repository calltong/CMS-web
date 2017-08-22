import React from 'react';

import {actions} from '../../../../actions/Action';
import EnText from '../../../../forms/EnText';

export default class Title extends React.Component {
  titleChange(event) {
    this.content.data.title = event.target.value;
    actions.page.home.setContent(this.props.index, this.content);
  }

  desChange(event) {
    this.content.data.description = event.target.value;
    actions.page.home.setContent(this.props.index, this.content);
  }

  render() {
    this.content = this.props.content;
    let content = this.content;
    return (
      <div>
        <div className="form-group">
          <label>ข้อความ</label>
          <EnText
            value={content.data.title}
            onChange={this.titleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>ข้อความเพิ่มเติม</label>
          <EnText
            value={content.data.description}
            onChange={this.desChange.bind(this)} />
        </div>
      </div>
    );
  }
}
