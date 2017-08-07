import React from 'react';

import {actions} from '../../../../actions/Action';

import MessageThai from '../../../../common/Message';
import MessageBox from '../../../../forms/EnMessageBox';
import EnText from '../../../../forms/EnText';
import EnImageSelector from '../../../../forms/EnImageSelector';
import LinkSetting from '../LinkSetting';

export default class ImageProperty extends React.Component {

  selectImage(files) {
    let l2 = this.props.selected.level_2;
    let l3 = this.props.selected.level_3;
    let item = this.props.item;
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        item.preview = data;
        actions.homePage.setItem(l2, l3, item);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onChange(selected, item) {
    let l2 = selected.level_2;
    let l3 = selected.level_3;
    actions.homePage.setItem(l2, l3, item);
  }

  selectProduct(product, data) {
    let index = data.index;
    let item = data.item;
    let l2 = index.level_2;
    let l3 = index.level_3;
    item.value = product._id;
    if (product.image_list.length > 0) {
      MessageBox.displayConfirm(
        MessageThai.title.confirm,
        MessageThai.confirm.use_image,
        function(isConfirm) {
          if (isConfirm === true) {
            item.preview = product.image_list[0].data;
          }
          actions.homePage.setItem(l2, l3, item);
        });
    } else {
      actions.homePage.setItem(l2, l3, item);
    }
  }

  titleChange(event) {
    let l2 = this.props.selected.level_2;
    let l3 = this.props.selected.level_3;
    let item = this.props.item;
    item.title = event.target.value;
    actions.homePage.setItem(l2, l3, item);
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
              <p className="help-block">จะใช้หรือไม่ใช้ก็ได้นะค่ะ</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <EnImageSelector maxWidth="150px" maxHeight="210px" lineHeight="210px"
              onDrop={this.selectImage.bind(this)}
              src={item.preview} />
            <p className="help-block">ขนาดรูปแนะนำ 1000x1400, 1000x1000</p>
          </div>
        </div>

        {title}

        <div className="row" style={cssRow} >
          <div className="col-md-12" >
            <LinkSetting
              onChange={this.onChange}
              selectProduct={this.selectProduct}
              index={this.props.selected}
              item={item} />
          </div>
        </div>
      </div>
    );
  }
}
