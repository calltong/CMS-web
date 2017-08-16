import React from 'react';

import EnImageSelector from '../../../../forms/EnImageSelector';
import EnText from '../../../../forms/EnText';
import EnTextArea from '../../../../forms/EnTextArea';
import {actions} from '../../../../actions/Action';

export default class Item extends React.Component {
  selectImage(files) {
    let item = this.props.data;
    let index = this.props.index;
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        item.preview = data;
        actions.aboutusPage.setItem(index, item);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  titleChange(event) {
    this.data.title = event.target.value;
    actions.aboutusPage.setItem(this.props.index, this.data);
  }

  descriptionChange(event) {
    this.data.description = event.target.value;
    actions.aboutusPage.setItem(this.props.index, this.data);
  }

  render() {
    this.data = this.props.data;
    let data = this.data;
    console.log('aite:', data);
    return (
      <div>
        <div className="form-group">
          <label>แผนที่ร้าน</label>
          <EnImageSelector maxWidth="150px" maxHeight="210px" lineHeight="210px"
            onDrop={this.selectImage.bind(this)}
            src={data.preview} />
          <p className="help-block">ขนาดแนะนำ 1x1</p>
        </div>
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
