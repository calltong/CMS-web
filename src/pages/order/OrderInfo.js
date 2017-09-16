import React from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import OrderActionBar from './OrderActionBar';
import OrderItems from './OrderItems';
import OrderStatus from './OrderStatus';
import AddressBox from './AddressBox';
import Payment from './Payment';

export default class OrderInfo extends ReducerBase {
  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      actions.order.getItem(id);
    }
  }

  render() {
    let order = store.getState().order;
    let data = order.data;
    return (
      <div className="container">
        <br />
        <OrderActionBar data={data}/>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <OrderItems data={data}/>
          </div>

          <div className="col-md-4">
            <OrderStatus data={data}/>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col-md-8">
            <AddressBox data={data.shipping}/>
          </div>

          <div className="col-md-4">
            <Payment data={data}/>
          </div>
        </div>

      </div>
    );
  }
}
