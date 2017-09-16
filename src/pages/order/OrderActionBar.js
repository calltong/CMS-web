import React from 'react';
import {Link} from 'react-router';
import swal from 'sweetalert';

import {actions} from '../../actions/Action';
import EnButton from '../../forms/button/EnButton';
import EnText from '../../forms/EnText';

export default class OrderActionBar extends React.Component {
  codeChange(event) {
    let data = this.props.data;
    data.tracking_code = event.target.value.trim();
    actions.order.setItem(data);
  }

  setStatus(status) {
    swal({
      title: '',
      text: 'ยืนยันอีกครั้ง',
      buttons: true,
    }).then((sure) => {
      if (sure) {
        actions.order.setOrderStatus(status);
      }
    });
  }

  shipping() {
    console.log('shipping');
    let data = this.props.data;
    if (data.tracking_code !== '') {
      this.setStatus('shipping');
    } else {
      swal({
        title: '',
        text: 'กรุณาใส่รหัสส่งสินค้า',
      });
    }
  }

  complete() {
    if (this.status !== 'complete') {
      this.setStatus('completed');
    }
  }

  reject() {
    if (this.status !== 'reject') {
      this.setStatus('reject');
    }
  }

  render() {
    let data = this.props.data;
    let index = data.status_list.length;
    this.status = '';
    if (index > 0) {
      let tracking = data.status_list[index - 1];
      this.status = tracking.status;
    }

    let shipping = false;
    let complete = true;
    let reject = false;
    if (this.status === 'reject' || this.status === 'completed') {
      shipping = true;
      complete = true;
      reject = true;
    } else if (this.status === 'shipping') {
      complete = false;
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <label>รหัสส่งสินค้า</label>
            <div className="form-group input-group" >
              <EnText style={{width: 220, marginRight:4}}
                readOnly={shipping}
                onChange={this.codeChange.bind(this)}
                value={data.tracking_code} />
              <EnButton
                disabled={shipping}
                onClick={this.shipping.bind(this)}
                className={'btn btn-add'} style={{marginRight:2, width:120}}>
                ส่งสินค้า
              </EnButton>
              <EnButton
                disabled={complete}
                onClick={this.complete.bind(this)}
                className={'btn btn-add'} style={{marginRight:2, width:120}}>
                ลูกค้าได้รับแล้ว
              </EnButton>
              <EnButton
                disabled={reject}
                onClick={this.reject.bind(this)}
                className={'btn btn-remove'} style={{marginRight:2, width:120}}>
                ยกเลิก
              </EnButton>
              <Link
                to={'/order'}
                className="btn btn-normal" style={{marginRight:2, width:120}}>
                กลับหน้าหลัก
              </Link>
            </div>
          </div>
        </div>
      </div>);
  }
}
