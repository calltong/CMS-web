import React from 'react';

import {actions} from '../../../../actions/Action';

import EnText from '../../../../forms/EnText';
//import SettingButton from '../../../../forms/button/SettingButton';
import EnImageSelector from '../../../../forms/EnImageSelector';

import LinkSetting from '../LinkSetting';

export default class WideImage extends React.Component {

  selectImage(files) {
    let l2 = this.props.selected.level_2;
    let item = this.props.item;
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        item.preview = data;
        actions.page.home.setItem(l2, item);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onChange(selected, item) {
    let l2 = selected.level_2;
    actions.page.home.setItem(l2, item);
  }

  titleChange(event) {
    let l2 = this.props.selected.level_2;
    let item = this.props.item;
    item.title = event.target.value;
    actions.page.home.setItem(l2, item);
  }

  render() {
    let cssRow = {
      marginTop: '10px',
    };

    let item = this.props.item;
    let title = <div />;
    if (this.props.title !== false) {
      title = (
        <div className="row" style={cssRow} >
          <div className="col-md-12" >
            <div className="form-group">
              <label>ข้อความ</label>
              <EnText
                value={item.title}
                onChange={this.titleChange.bind(this)}
                placeholder="ข้อความ.." />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <EnImageSelector maxWidth="240px" maxHeight="120px" lineHeight="120px"
              onDrop={this.selectImage.bind(this)}
              src={item.preview} />
            <p className="help-block">ขนาดแนะนำ 1000x2000</p>
          </div>
        </div>

        {title}

        <div className="row" style={cssRow} >
          <div className="col-md-12" >
            <LinkSetting
              onChange={this.onChange}
              index={this.props.selected}
              item={item} />
          </div>
        </div>

      </div>
    );
  }
}
