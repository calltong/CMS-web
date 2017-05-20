import React from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import OrderItems from './OrderItems';
import AddressBox from './AddressBox';
import EnHeader from '../../forms/EnHeader';
import EnButton from '../../forms/EnButton';
import EnText from '../../forms/EnText';

class OrderActionBar extends React.Component {
  codeChange() {

  }

  render() {
    let data = this.props.data;
    let index = data.trackings.length;
    let text = 'Created';
    if (index > 0) {
      let tracking = data.trackings[index - 1];
      switch (tracking.status) {
        case 'created':
          text = 'Created';
          break;
        case 'planing':
          text = 'Planing';
          break;
        case 'quatation':
          text = 'Quatation';
          break;
        case 'payment':
          text = 'Payment';
          break;
        case 'install':
          text = 'Install';
          break;
        case 'completed':
          text = 'Completed';
          break;
        default:

      }
    }

    return (
    <div style={{marginBottom:4}}>
      <div className="row">
        <div className="col-md-10">
          <label>Order Status</label>
          <div className="form-group input-group" >
            <EnText style={{width:200, marginRight:4}}
              value={text} />
            <EnButton
                onClick={this.codeChange.bind(this)}
                className={'btn btn-add'} style={{marginRight:2, width:120}}>
                Set
            </EnButton>
            <EnButton
                onClick={this.codeChange.bind(this)}
                className={'btn btn-remove'} style={{marginRight:2, width:120}}>
                Reject
            </EnButton>
            <EnButton
                onClick={this.codeChange.bind(this)}
                className={'btn btn-normal'} style={{marginRight:2, width:120}}>
                Close
            </EnButton>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export class OrderInfo extends ReducerBase {

  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      store.update('ORDER_GET_ITEM', {id});
    }
  }

  onSave() {

  }

  render() {
    let order = store.getState().order;
    let data = order.data;
    console.log('order:', data);
    return (

      <div className="container">
        <EnHeader name="Order Information"/>
        <OrderActionBar data={data}/>

        <div className="row">
          <div className="col-md-6">
            <AddressBox data={data}/>
          </div>

          <div className="col-md-6">
            <OrderItems items={data.items}/>
          </div>
        </div>

      </div>
    );
  }
}

export default OrderInfo;
