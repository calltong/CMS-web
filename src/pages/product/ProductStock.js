import React, { Component } from 'react';

//import {store} from '../../store';
import {actions} from '../../actions/Action';

import MessageThai from '../../common/Message';
import MessageBox from '../../forms/EnMessageBox';
import EnListBox from '../../forms/EnListBox';
import EnNumberText from '../../forms/EnNumberText';
import EnButton from '../../forms/button/EnButton';

export class ProductStock extends Component {

  async sizeAdd(event) {
    let value = event.target.value;
    let data = this.props.data;

    let size = this.props.size_list.find(item => {
      return item._id === value;
    });

    let found = await data.stock_list.find(item => {
      return item.size._id === value;
    });

    if (found) {
      MessageBox.display(
        MessageThai.title.warning,
        MessageThai.warning.duplicate);
      actions.product.refresh();
    } else {
      data.stock_list.push({size: size, quantity: 0});
      actions.product.setItem(data);
    }
  }

  async sizeChange(index, event) {
    let value = event.target.value;
    let data = this.props.data;

    let size = this.props.size_list.find(item => {
      return item._id === value;
    });

    let found = await data.stock_list.find(item => {
      return item.size._id === value;
    });
    if (found) {
      MessageBox.display(
        MessageThai.title.warning,
        MessageThai.warning.duplicate);
      actions.product.refresh();
    } else {
      data.stock_list[index].size = size;
      actions.product.setItem(data);
    }
  }

  quantityChange(index, event) {
    let value = event.target.value;
    let data = this.props.data;
    let stock_list = data.stock_list;
    let val = parseInt(value, 10);
    stock_list[index].quantity = val? val: 0;
    data.stock_list = stock_list;
    actions.product.setItem(data);
  }

  onDelete(index) {
    let data = this.props.data;
    MessageBox.displayConfirm(
      MessageThai.title.confirm,
      MessageThai.confirm.remove,
      function() {
        data.stock_list.splice(index, 1);
        actions.product.setItem(data);
      });
  }

  render() {
    let data = this.props.data;
    let sizeList = this.props.size_list.map(item => {
      return {id: item._id, text: item.name};
    });

    let list = data.stock_list.map((item, index) => {
      let id = item.size._id;
      return (
      <tr key={id}>
        <td>
          <EnListBox
            value={id}
            data={sizeList}
            onSelect={this.sizeChange.bind(this, index)}/></td>
        <td>
          <EnNumberText
            value={item.quantity}
            onChange={this.quantityChange.bind(this, index)}/></td>
        <td style={{textAlign: 'center'}}>
            <EnButton onClick={this.onDelete.bind(this, index)} className="btn btn-default">
              <i className="fa fa-close" data-tip="delete"/> Delete
            </EnButton>
        </td>
      </tr>);
    });

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
          <div className="col-md-6">
          <div className="table-responsive">
            <table width="100%" className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="col-md-2">Size</th>
                  <th className="col-md-2">Quantity</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                {list}
                <tr>
                  <td>
                    <EnListBox
                      data={sizeList}
                      onSelect={this.sizeAdd.bind(this)}/>
                  </td>
                  <td/>
                  <td/>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductStock;
