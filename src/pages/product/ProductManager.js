import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import qs from 'qs';

import ProductTable from './component/ProductTable';
import SearchBar from './component/SearchBar';

import EnHeader from '../../forms/EnHeader';
import Paginator from '../../forms/Paginator';

export class ProductManager extends Component {
  componentDidMount() {
    let query = qs.parse(this.props.location.search.replace('?', ''));
    if (query.page) {
      this.props.ma_product.getList(query.page);
    } else {
      this.props.ma_product.getCountAndList(1);
    }
  }

  handleNext() {
    let index = this.product.page.index + 1;
    if (index <= this.product.page.total) {
      this.props.ma_product.getList(index);
    }
  }

  handlePrev() {
    let index = this.product.page.index - 1;
    if (index >= 1) {
      this.props.ma_product.getList(index);
    }
  }

  handleJump(index) {
    this.props.ma_product.getList(index);
  }

  render() {
    this.product = this.props.ma_product.toJS();
    let page = this.product.page;
    let num = page.total / page.limit;
    let total = Math.ceil(num);
    if (total <= 1) {
      total = 1;
    }
    return (
      <div className="container-fluid">
        <EnHeader name="รายการสินค้า"/>
        <SearchBar />
        <hr/>

        <div className="table-responsive">
          <ProductTable />

          <Paginator display={5} pages={total} current={page.index}
            onNext={this.handleNext.bind(this)}
            onPrev={this.handlePrev.bind(this)}
            onJump={this.handleJump.bind(this)} />
        </div>
      </div>
    );
  }
}

export default inject('ma_product')(observer(ProductManager));
