import React, { Component } from 'react';
import {Link} from 'react-router';

import ProductSearchBar from './ProductSearchBar';
import EnButton from '../../forms/EnButton';
import EnHeader from '../../forms/EnHeader';
import Paginator from '../../forms/Paginator';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

export class ProductTable extends Component {

  onDelete(id) {
    store.update('PRODUCT_REMOVE_ITEM', {id});
  }

  render() {
    let data = this.props.data;
    let indexColsize = data.size.index;
    let totalSize = data.size.total;
    let colsize = data.size.limit + indexColsize;
    if (colsize > totalSize) {
      colsize = totalSize;
    }
    let data_list = data.data_list;
    let sizes = data.size_list.slice(indexColsize, colsize);
    let sizeList = sizes.map(item => {
      return (<td key={item._id} className="col-md-1" style={{textAlign: 'center'}}>{item.name}</td>)
    });


    let list = data_list.map(item => {
      let stock_list = item.stock_list;
      let sizeData = [];

      for(let size of sizes) {
        let found = stock_list.find(stock => {
          if (stock.size._id === size._id) {
              return stock;
          } else {
              return undefined;
          }

        });
        if (found) {
          sizeData.push((<td key={size._id} style={{textAlign: 'center'}}>{found.quantity}</td>));
        } else {
          sizeData.push((<td key={size._id} style={{textAlign: 'center'}}>-</td>));
        }
      }
      return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.code}</td>
        <td>{item.price}</td>
        <td>{item.sale_price}</td>
        {sizeData}
        <td style={{textAlign: 'center'}}>
          <Link to={`ProductManager/${item._id}/Edit`} className="btn btn-xs btn-default">
            <i className="fa fa-pencil" data-tip="edit"/> Edit
          </Link>
        </td>
        <td style={{textAlign: 'center'}}>
          <EnButton onClick={this.onDelete.bind(this, item._id)} className="btn btn-xs btn-default">
            <i className="fa fa-close" data-tip="delete"/> Del
          </EnButton>
        </td>
      </tr>
      )
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-5">Name</th>
            <th className="col-md-1">Code</th>
            <th className="col-md-1">Price</th>
            <th className="col-md-1">Sale</th>
            {sizeList}
            <th></th>
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

export class ProductManagement extends ReducerBase {

  componentDidMount() {
    store.update('PRODUCT_GET_FULL_LIST');
    store.update('PRODUCT_GET_SIZE');
  }

  handleNext() {
    let state = store.getState().product;
    let index = state.page.index + 1;
    if (index <= state.page.total) {
      store.update('PRODUCT_GET_LIST', {index:index});
    }
  }

  handlePrev() {
    let state = store.getState().product;
    let index = state.page.index - 1;
    if (index >= 1) {
      store.update('PRODUCT_GET_LIST', {index:index});
    }
  }

  handleJump(index) {
    store.update('PRODUCT_GET_LIST', {index:index});
  }

  render() {
    let ob = store.getState().product;
    let page = ob.page;
    let total = Math.round(page.total / page.limit);
    if (total <= 1) {
      total = 1;
    }
    return (
      <div className="container-fluid">
        <EnHeader name="Product Manager"/>
         <ProductSearchBar/>

         <div className="row" style={{marginTop:4}}>
           <div className="col-md-12">
             <div className="table-responsive">
               <ProductTable data={ob}/>

               <Paginator display={5} pages={total} current={page.index}
                onNext={this.handleNext.bind(this)}
                onPrev={this.handlePrev.bind(this)}
                onJump={this.handleJump.bind(this)}
               />
             </div>
           </div>
         </div>
      </div>
    );
  }
}

export default ProductManagement;
