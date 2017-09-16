import React, { Component } from 'react';
import Select from 'react-select';

import ProductSearchBar from './ProductSearchBar';
import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';
import EnHeader from '../../forms/EnHeader';
import EnImage from '../../forms/EnImage';
import Paginator from '../../forms/Paginator';
import MessageThai from '../../common/Message';
import MessageBox from '../../forms/EnMessageBox';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

export class ProductTable extends Component {
  sizeChange(event) {
    let index = event.value;
    actions.product.selectSize(index);
  }

  onDelete(id) {
    MessageBox.displayConfirm(
      MessageThai.title.confirm,
      MessageThai.confirm.remove,
      function() {
        actions.product.remove(id);
      });
  }

  render() {
    let cssCenter = {textAlign: 'center'};
    let data = this.props.data;
    let sizeStart = data.size.index;
    let sizeTotal = data.size.total;
    let colsize = data.size.limit + sizeStart;
    if (colsize > sizeTotal) {
      colsize = sizeTotal;
    }
    let data_list = data.data_list;
    let sizes = data.size_list.slice(sizeStart, colsize);

    let sizeSelected = data.size_list.map((item, index) => {
      return {value: index, label: item.code, clearableValue: false};
    });

    let sizeList = sizes.map((item, i) => {
      if (i === 0) {
        return (
          <th key={item._id} className="col-md-1" style={cssCenter}>
            <Select
              clearable={false}
              searchable={false}
              value={sizeStart}
              options={sizeSelected}
              onChange={this.sizeChange.bind(this)} />
          </th>);
      } else {
        return (<th key={item._id} style={cssCenter}>{item.code}</th>);
      }
    });

    let list = data_list.map(item => {
      let stock_list = item.stock_list;
      let sizeData = [];

      for (let size of sizes) {
        let found = stock_list.find(stock => {
          if (stock.size._id === size._id) {
            return stock;
          } else {
            return undefined;
          }
        });

        sizeData.push((<td key={size._id} style={cssCenter}>{found === undefined ? '-': found.quantity}</td>));
      }

      let img = '';
      if (item.image_list.length > 0) {
        img = item.image_list[0].data;
      }
      return (
      <tr key={item._id}>
        <td>
          <EnImage className="product-img" src={img} />
        </td>
        <td>{item.code}</td>
        <td>{item.price}</td>
        <td>{item.sale_price}</td>
        {sizeData}
        <td style={cssCenter}>
          <TableEditBtn to={`product/${item._id}/edit`} />
          <TableRemoveBtn onClick={this.onDelete.bind(this, item._id)} style={{marginTop: '2px'}} />
        </td>
      </tr>
    );
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-1">รูป.</th>
            <th>Code</th>
            <th>ราคา</th>
            <th>ราคา Sale</th>
            {sizeList}
            <th className="col-md-1"/>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    );
  }
}

export class ProductManagement extends ReducerBase {
  componentDidMount() {
    let page = this.props.location.query.page;
    if (page) {
      actions.product.getList(page);
    } else {
      actions.product.getCountAndList(1);
    }
  }

  handleNext() {
    let product = store.getState().product;
    let index = product.page.index + 1;
    if (index <= product.page.total) {
      actions.product.getList(index);
    }
  }

  handlePrev() {
    let product = store.getState().product;
    let index = product.page.index - 1;
    if (index >= 1) {
      actions.product.getList(index);
    }
  }

  handleJump(index) {
    actions.product.getList(index);
  }

  render() {
    let product = store.getState().product;
    let page = product.page;
    let num = page.total / page.limit;
    let total = Math.ceil(num);
    if (total <= 1) {
      total = 1;
    }
    return (
      <div className="container-fluid">
        <EnHeader name="รายการสินค้า"/>
        <ProductSearchBar/>
        <hr/>

        <div className="table-responsive">
          <ProductTable data={product}/>

          <Paginator display={5} pages={total} current={page.index}
            onNext={this.handleNext.bind(this)}
            onPrev={this.handlePrev.bind(this)}
            onJump={this.handleJump.bind(this)} />
          </div>
      </div>
    );
  }
}

export default ProductManagement;
