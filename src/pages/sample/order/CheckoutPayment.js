import React from 'react';

import {actions} from '../../../actions/Action';
import {ReducerBase} from '../../../ReducerBase';
import blank from '../../../image/blank.png';

import OrderPanel from './OrderPanel';
import OrderMenu from './OrderMenu';
import PaymentRegister from './PaymentRegister';

export class CheckoutPayment extends ReducerBase {
  componentDidMount() {
    actions.page.main.getPayment();
  }

  checkout() {
  }

  backCheckout() {

  }

  render() {
    let order = {
      display_list: [
        {
          product: {
            name: 'ชื่อสินค้า',
            price: 190,
            image_list: [
              {
                data: blank,
              },
            ],
          },
          size: {
            name: 'small',
            code: 'small',
          },
          quantity: 10,
        },
      ],
      summary: {
        total: 1900,
        shipping: 0,
        discount: 0,
      },
    };
    return (
    <div className="container summary-form">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderMenu status={'payment'} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <PaymentRegister
            checkout={this.checkout.bind(this)}
            backCheckout={this.backCheckout.bind(this)} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          <OrderPanel disable={true} data={order} />
        </div>
      </div>
    </div>
    );
  }
}

export default CheckoutPayment;
