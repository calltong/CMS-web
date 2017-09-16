import React, {Component} from 'react';

export default class AddressBox extends Component {

  render() {
    let data = this.props.data;
    let column1 = 'col-md-5';
    let column2 = 'col-md-3';
    return (
      <div>
        <div className="order-header">
          <p>ลูกค้า</p>
        </div>
        <div className="row">
          <div className={column1}>
            <strong>ชื่อ</strong>
          </div>
          <div className={column2}>
            <strong>เบอร์โทร</strong>
          </div>
          <div className={column2}>
            <strong>Email</strong>
          </div>
        </div>
        <div className="row">
          <div className={column1}>
            {data.name}
          </div>
          <div className={column2}>
            {data.mobile}
          </div>
          <div className={column2}>
            {data.email}
          </div>
        </div>

        <br />

        <div className="row">
          <div className={column1}>
            <strong>ที่อยู่</strong>
          </div>
          <div className={column2}>
            <strong>จังหวัด</strong>
          </div>
          <div className={column2}>
            <strong>Post Code</strong>
          </div>
        </div>
        <div className="row">
          <div className={column1}>
            {data.address}
          </div>
          <div className={column2}>
            {data.city}
          </div>
          <div className={column2}>
            {data.postcode}
          </div>
        </div>
      </div>
    );
  }
}
