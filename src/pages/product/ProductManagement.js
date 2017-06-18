import React, { Component } from 'react';
import {Link} from 'react-router';

import ProductSearchBar from './ProductSearchBar';
import EnButton from '../../forms/EnButton';
import EnHeader from '../../forms/EnHeader';
import EnImage from '../../forms/EnImage';
import Paginator from '../../forms/Paginator';
import MessageThai from '../../common/Message';
import MessageBox from '../../forms/EnMessageBox';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

export class ProductTable extends Component {
  onDelete(id) {
    MessageBox.displayConfirm(
      MessageThai.title.confirm,
      MessageThai.confirm.remove,
      function() {
        actions.product.remove(id);
      });

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
      return (<td key={item._id} className="col-md-1" style={{textAlign: 'center'}}>{item.name}</td>);
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
        if (found) {
          sizeData.push((<td key={size._id} style={{textAlign: 'center'}}>{found.quantity}</td>));
        } else {
          sizeData.push((<td key={size._id} style={{textAlign: 'center'}}>-</td>));
        }
      }

      let img = '';
      if (item.image_list.length > 0) {
        img = item.image_list[0].data;
      }
      return (
      <tr key={item._id}>
        <td>
          <EnImage src={img} className="product-img"/>
        </td>
        <td>{item.name}</td>
        <td>{item.code}</td>
        <td>{item.price}</td>
        <td>{item.sale_price}</td>
        {sizeData}
        <td style={{textAlign: 'center'}}>
          <Link to={`ProductManager/${item._id}/Edit`} className="btn btn-xs btn-default" style={{width:'50px'}}>
            <i className="fa fa-pencil" data-tip="edit"/> Edit
          </Link>
        </td>
        <td style={{textAlign: 'center'}}>
          <EnButton onClick={this.onDelete.bind(this, item._id)} className="btn btn-xs btn-default" style={{width:'50px'}}>
            <i className="fa fa-close" data-tip="delete"/> Del
          </EnButton>
        </td>
      </tr>
    );
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-1">Pic.</th>
            <th className="col-md-5">Name</th>
            <th className="col-md-1">Code</th>
            <th className="col-md-1">Price</th>
            <th className="col-md-1">Sale</th>
            {sizeList}
            <th/>
            <th/>
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
      actions.product.getSizeList();
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
        <EnHeader name="Product Manager"/>
         <ProductSearchBar/>

         <div className="row" style={{marginTop:4}}>
           <div className="col-md-12">
             <div className="table-responsive">
               <ProductTable data={product}/>

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
