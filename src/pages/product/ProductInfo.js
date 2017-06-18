import React from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

//import CompleteSection from '../../forms/CompleteSection';
import EnHeader from '../../forms/EnHeader';

import BasicInfo from './BasicInfo';
import ProductImage from './ProductImage';
import ProductSquareImage from './ProductSquareImage';
import BasicEngInfo from './BasicEngInfo';
import ProductStock from './ProductStock';
import EnButton from '../../forms/EnButton';

export class ProductInfo extends ReducerBase {

  componentDidMount() {
    actions.product.getTypeList();
    actions.product.getSizeList();
    let id = this.props.params.id;
    if (id) {
      actions.product.getItem(id);
    } else {
      actions.product.resetItem();
    }
  }

  onSave() {
    let ob = store.getState().product;
    if (ob.data.name === '' || ob.data.type_id === 0) {

      this.setState(this.state);
    } else {
      actions.product.saveItem();
    }
  }

  onLazadaUpdate() {
    actions.ecommerce.updateLazada(this.props.params.id);
  }

  onLazadaQuantityUpdate() {
    actions.ecommerce.updateQuantityLazada(this.props.params.id);
  }

  onLazadaImageUpdate() {
    actions.ecommerce.updateImageLazada(this.props.params.id);
  }

  render() {
    let product = store.getState().product;

    return (
      <div className="container">
        <EnHeader name="Product Information"/>
        <div className="row">
          <div className="col-md-8">
            <EnButton className="btn btn-save" onClick={this.onLazadaUpdate.bind(this)}>
              Lazada Update
            </EnButton>
            <EnButton className="btn btn-save" onClick={this.onLazadaQuantityUpdate.bind(this)} style={{marginLeft:4}}>
              Lazada Quantity
            </EnButton>
            <EnButton className="btn btn-save" onClick={this.onLazadaImageUpdate.bind(this)} style={{marginLeft:4}}>
              Lazada Image
            </EnButton>
         </div>
         <div className="col-md-4">
           <div className="text-right">
             <Link to={`/ProductManager?page=${product.page.index}`} className="btn btn-close">
               Close
             </Link>
             <EnButton className="btn btn-save" onClick={this.onSave.bind(this)} style={{marginLeft:4}}>
               Save
             </EnButton>
          </div>
        </div>
      </div>

      <hr/>

      <div className="row">
        <ul className="nav nav-pills">
          <li className="active">
            <a href="#Information" data-toggle="tab">Information</a>
          </li>
          <li>
            <a href="#InformationEng" data-toggle="tab">English Information</a>
          </li>
          <li>
            <a href="#Stock" data-toggle="tab">Stock</a>
          </li>
        </ul>

        <hr/>

        <div className="tab-content">

          <div id="Information" className="tab-pane in active">
            <BasicInfo/>
          </div>

          <div id="InformationEng" className="tab-pane" style={{paddingBottom: 10}}>
            <BasicEngInfo data={product.data} />
          </div>
          <div id="Stock" className="tab-pane">
            <ProductStock data={product.data} size_list={product.size_list} />
          </div>
       </div>
     </div>

    <div className="row">
      <ProductImage data={product.data} />
    </div>

    <div className="row">
      <ProductSquareImage data={product.data} />
    </div>

  </div>
    );
  }
}

export default ProductInfo;
