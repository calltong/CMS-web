import React from 'react';
import {NotificationContainer} from 'react-notifications';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';
import {manager} from '../../utility/Manager';

import EnHeader from '../../forms/EnHeader';
import SaveButton from '../../forms/button/SaveButton';
import CloseButton from '../../forms/button/CloseButton';

import BasicInfo from './BasicInfo';
import ProductImage from './ProductImage';
import ProductSquareImage from './ProductSquareImage';
import BasicEngInfo from './BasicEngInfo';
import ProductStock from './ProductStock';
import LoadingWindow from '../../forms/LoadingWindow';

export class ProductInfo extends ReducerBase {

  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      actions.product.getItem(id);
      actions.ecommerce.checkOnLazada(id);
    } else {
      actions.product.resetItem();
    }
  }

  onSave() {
    let ob = store.getState().product;
    if (ob.data.name === '' || ob.data.type_id === 0) {
      this.setState(this.state);
    } else {
      manager.DisplayPanel('#Loading');
      actions.product.saveItem();
    }
  }

  onLazadaUpdate() {
    manager.DisplayPanel('#Loading');
    actions.ecommerce.updateLazada(this.props.params.id);
  }

  onLazadaQuantityUpdate() {
    manager.DisplayPanel('#Loading');
    actions.ecommerce.updateQuantityLazada(this.props.params.id);
  }

  onLazadaImageUpdate() {
    manager.DisplayPanel('#Loading');
    actions.ecommerce.updateImageLazada(this.props.params.id);
  }

  render() {
    let product = store.getState().product;

    let ecommerce = product.ecommerce;
    let cssLazadaAction = ecommerce.lazada ? 'btn btn-menu btn-action dropdown-toggle' : 'btn btn-menu btn-action-alert dropdown-toggle';
    return (
      <div className="container">
        <EnHeader name="Product Information"/>
        <form className="form-inline">
          <SaveButton onClick={this.onSave.bind(this)} />
          <CloseButton to={`/product?page=${product.page.index}`} />

          <div className="form-group">
            <div className="dropdown">
              <button
                className={cssLazadaAction}
                type="button" id="dropdownLazada" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="true">
                Lazada <span className="caret" />
              </button>

              <ul className="dropdown-menu" aria-labelledby="dropdownLazada">
                <li><a onClick={this.onLazadaUpdate.bind(this)}>Update Information</a></li>
                <li><a onClick={this.onLazadaQuantityUpdate.bind(this)}>Update Quantity&Price</a></li>
                <li><a onClick={this.onLazadaImageUpdate.bind(this)}>Update Images</a></li>
                <li role="separator" className="divider"/>
                <li><a href="#">Active/Unactive</a></li>
              </ul>
            </div>
          </div>

       </form>

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

    <LoadingWindow/>
    <NotificationContainer />
  </div>
    );
  }
}

export default ProductInfo;
