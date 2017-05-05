import React from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import EnHeader from '../../forms/EnHeader';
import EnButton from '../../forms/EnButton';
import EnText from '../../forms/EnText';
import EnTextArea from '../../forms/EnTextArea';

class OrderActionBar extends React.Component {

  codeChange(condition) {
    store.update('ORDER_GET_LIST', {condition});
  }

  onFind(condition) {
    store.update('ORDER_GET_LIST', {condition});
  }

  render() {

    return (
    <div style={{marginBottom:4}}>
      <div className="row">
        <div className="col-md-10">
          <div className="form-group input-group" >
            <EnText style={{width:240, marginRight:4}}
              placeholder="Tracking Code..."
              value={''}
              onChange={this.codeChange.bind(this)} />
              <EnButton
                onClick={this.onFind.bind(this)}
                className={'btn btn-add'} style={{marginRight:2, width:120}}>
                Set
              </EnButton>
              <EnButton
                onClick={this.onFind.bind(this)}
                className={'btn btn-remove'} style={{marginRight:2, width:120}}>
                Reject
              </EnButton>
              <EnButton
                onClick={this.onFind.bind(this)}
                className={'btn btn-normal'} style={{marginRight:2, width:120}}>
                Close
              </EnButton>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

class OrderProductTable extends React.Component {
  render() {
    let index = -1;
    let data = this.props.data;
    let list = data.product_list.map(item => {
    return (
    <div key={index++}>
      <hr/>
      <div className="row">

        <div className="col-xs-4 col-md-4">
          <img className="summary-img img-rounded" src={item.image_list[0]} role="presentation"/>
        </div>
        <div className="col-xs-8 col-md-8">
          <div className="row">
            <div className="col-xs-4 col-md-4">
              Name:
              <br/>
              Size:
              <br/>
              Quantity:
              <br/>
              Price:
              </div>

            <div className="col-xs-8 col-md-8">
              {item.product.name}
              <br/>
              {item.size.name}
              <br/>
              {item.quantity}
              <br/>
              {item.product.price} Bath
            </div>
          </div>
        </div>
      </div>

    </div>
    );
  });
    return (
    <div className="panel panel-info">
      <div className="panel-heading">Product List</div>
      <div className="panel-body">
        {list}
      </div>
    </div>
    )
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
    return (
      <div className="container">

       <EnHeader name="Order Information"/>
        <OrderActionBar/>

        <div className="row">
          <div className="col-md-7">
            <div className="form-group">
              <label>Customer Information</label>
              <EnTextArea
                rows="4"
                value={''}
                readOnly={true}/>
            </div>

            <OrderProductTable data={order.data}/>
          </div>

          <div className="col-md-4">

            <div className="form-group">
              <label>Total</label>
              <EnText
                value={data.total}/>
            </div>

            <div className="form-group">
              <label>Promotion</label>
              <EnText
                value={data.promotion}/>
            </div>

            <div className="form-group">
              <label>Date</label>
              <EnTextArea
                rows={3}
                value={''}/>
            </div>

            <div className="form-group">
              <label>Slip</label>
              <img className="slip-img img-rounded" src={data.slip} role="presentation"/>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default OrderInfo;
