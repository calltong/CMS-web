import React, { Component } from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import OrderSearchBar from './OrderSearchBar';
//import EnButton from '../../forms/EnButton';
import EnHeader from '../../forms/EnHeader';

class OrderTable extends Component {
  onDelete(id) {
    store.update('ORDER_REMOVE_ITEM', {id});
  }

  render() {
    let data_list = this.props.data.data_list;
    let list = data_list.map(item => {
      return (
      <tr key={item._id}>
        <td>{item.customer}</td>
        <td>{item.date}</td>
        <td>{item.total}</td>
        <td>{item.promotion}</td>
        <td style={{textAlign: 'center'}}>
          <div>
            <Link to={`OrderManager/${item._id}/Info`} className="btn btn-xs btn-default">
              <i className="fa fa-pencil" data-tip="edit"/> View
            </Link>
          </div>
        </td>
      </tr>
      )
    });


    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Promotion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    );
  }
}

export class OrderManager extends ReducerBase {

  componentDidMount() {
    store.update('ORDER_GET_LIST', {index: 1});
  }

  render() {
    let state = store.getState();
    return (
      <div className="container-fluid">
        <EnHeader name="Order Manager"/>
        <div className="row">
          <div className="col-md-10">
            <OrderSearchBar />
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            <div className="table-responsive">
              <OrderTable
                data={state.order}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderManager;
