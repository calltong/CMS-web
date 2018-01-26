import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

import TableEditBtn from '../../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../../forms/button/TableRemoveBtn';
import EnImage from '../../../forms/EnImage';
import {box} from '../../../utility/MessageBox';

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
  componentDidMount() {
    this.props.ma_size.getList(false);
  }

  onDelete(id) {
    box.DisplayConfirm(
      'ยืนยันลบข้อมูล',
      function(confirm) {
        if (confirm === true) {
          this.props.actions.remove(id);
        }
      });
  }

  render() {
    let cssCenter = {textAlign: 'center'};
    this.product = this.props.ma_product.toJS();
    this.size = this.props.ma_size.toJS();
    let blank = [];
    let sizeList = this.size.list.map((item, i) => {
      blank.push(<td key={item._id} />);
      return (<th key={item._id} style={cssCenter}>{item.code}</th>);
    });

    let list = [];
    let index = 0;
    for (let item of this.product.list) {
      let variant_list = item.variant_list ? item.variant_list : [];
      if (variant_list.length > 0) {
        for (let variant of item.variant_list) {
          list.push(
            <RowItem
              key={index++}
              product={item}
              variant={variant}
              sizes={this.size.list}
              blank={blank}
              onDelete={this.onDelete} />);
        }
      } else {
        list.push(
          <Blank
            key={index++}
            product={item}
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

export default inject('ma_product', 'ma_size')(observer(ProductTable));
