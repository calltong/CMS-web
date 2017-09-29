import React, { Component } from 'react';

import ProductSearchBar from './ProductSearchBar';
import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';
import EnHeader from '../../forms/EnHeader';
import EnImage from '../../forms/EnImage';
import Paginator from '../../forms/Paginator';
import {messageBox} from '../../utility/MessageBox';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

class Blank extends Component {
  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    let cssCenter = {textAlign: 'center'};
    let product = this.props.product;
    return (
      <tr>
        <td>
          <EnImage className="product-img" src={product.image} />
        </td>
        <td>{product.code}</td>
        <td>{product.price}</td>
        <td>{product.sale_price}</td>
        {this.props.blank}
        <td style={cssCenter}>
          <TableEditBtn to={`product/${product._id}/edit`} />
          <TableRemoveBtn onClick={this.onDelete.bind(this, product._id)} style={{marginTop: '2px'}} />
        </td>
      </tr>
    );
  }
}

class RowItem extends Component {
  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    let cssCenter = {textAlign: 'center'};
    let product = this.props.product;
    let variant = this.props.variant;
    let img = product.image;
    if (variant.image_list.length > 0) {
      img = variant.image_list[0];
    }

    let index = 0;
    let stock = [];
    for (let item of this.props.sizes) {
      let found = variant.list.find(it => {
        if (it.size._id === item._id) {
          return it;
        } else {
          return undefined;
        }
      });
      if (found) {
        stock.push(<td key={++index}>{found.quantity}</td>);
      } else {
        stock.push(<td key={++index}>0</td>);
      }
    }

    return (
      <tr>
        <td>
          <EnImage className="product-img" src={img} />
        </td>
        <td>{product.code}</td>
        <td>{product.price}</td>
        <td>{product.sale_price}</td>
        {stock}
        <td style={cssCenter}>
          <TableEditBtn to={`product/${product._id}/edit`} />
          <TableRemoveBtn onClick={this.onDelete.bind(this, product._id)} style={{marginTop: '2px'}} />
        </td>
      </tr>
    );
  }
}

export class ProductTable extends Component {
  onDelete(id) {
    messageBox.DisplayConfirm(
      'ยืนยันลบข้อมูล',
      function(confirm) {
        if (confirm === true) {
          actions.product.remove(id);
        }
      });
  }

  render() {
    let cssCenter = {textAlign: 'center'};
    let size = this.props.size;
    let data = this.props.data;
    let data_list = data.data_list;
    let blank = [];
    let sizeList = size.data_list.map((item, i) => {
      blank.push(<td key={item._id} />);
      return (<th key={item._id} style={cssCenter}>{item.code}</th>);
    });

    let list = [];
    let index = 0;
    for (let item of data_list) {
      let product = item.product;
      let stock = item.stock;
      let variant_list = stock.variant_list ? stock.variant_list : [];
      if (variant_list.length > 0) {
        for (let variant of stock.variant_list) {
          list.push(
            <RowItem
              key={index++}
              product={product}
              variant={variant}
              sizes={size.data_list}
              blank={blank}
              onDelete={this.onDelete} />);
        }
      } else {
        list.push(
          <Blank
            key={index++}
            product={product}
            blank={blank}
            onDelete={this.onDelete} />);
      }
    }

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

export default class ProductManagement extends ReducerBase {
  componentDidMount() {
    actions.size.getList(false);
    actions.type.getList(false);
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
    let state = store.getState();
    let size = state.size;
    let product = state.product;
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
          <ProductTable data={product} size={size} />

          <Paginator display={5} pages={total} current={page.index}
            onNext={this.handleNext.bind(this)}
            onPrev={this.handlePrev.bind(this)}
            onJump={this.handleJump.bind(this)} />
        </div>
      </div>
    );
  }
}
