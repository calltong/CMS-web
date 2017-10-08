import React from 'react';

import {actions} from '../../../../actions/Action';
import {box} from '../../../../utility/MessageBox';
import EnText from '../../../../forms/EnText';
import EnImageSelector from '../../../../forms/EnImageSelector';
import LinkSetting from '../LinkSetting';

export default class Image extends React.Component {
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

  selectProduct(product, data) {
    let index = data.index;
    let item = data.item;
    let l2 = index.level_2;
    item.value = product._id;

    box.DisplayConfirm(
      'ต้องการใช้รูปสินค้าใช่มัยค่ะ',
      function(confirm) {
        if (confirm === true) {
          item.preview = product.image;
        }
        item.name = product.content.main.name;
        console.log(confirm, ' item:', item);
        actions.page.home.setItem(l2, item);
      }
    );
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
            <p className="help-block">ขนาดรูปแนะนำ 1000x1500, 1000x1000</p>
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
