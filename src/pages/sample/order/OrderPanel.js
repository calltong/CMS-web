import React from 'react';

import OrderList from './OrderList';

export class OrderPanel extends React.Component {
  checkoutByGuest() {
  }

  render() {
    let data = this.props.data;
    let footer = <div />;
    if (this.props.disable === undefined) {
      footer = (
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-8">
              <button type="button"
                className="btn btn-normal btn-summary-size pull-right"
                onClick={this.checkoutByGuest.bind(this)} >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="panel panel-order">
        <div className="panel-heading">
          รายการสินค้า
        </div>
        <div className="panel-body" style={{padding:'8px'}}>
          <OrderList data={data} />
        </div>
        {footer}
      </div>
    );
  }
}

export default OrderPanel;
