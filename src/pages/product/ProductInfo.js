import React from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';
import {manager} from '../../utility/Manager';

import EnHeader from '../../forms/EnHeader';
import SaveButton from '../../forms/button/SaveButton';
import CloseButton from '../../forms/button/CloseButton';

import BasicInfo from './BasicInfo';
import ProductStock from './ProductStock';
import LoadingWindow from '../../forms/LoadingWindow';

export class ProductInfo extends ReducerBase {
  componentDidMount() {
    actions.size.getList(false);
    actions.type.getList(false);
    let id = this.props.params.id;
    if (id) {
      actions.product.getItem(id);
      actions.stock.getItem(id);
      actions.ecommerce.checkOnLazada(id);
    } else {
      actions.product.resetItem();
      actions.stock.resetItem();
    }
  }

  onSave() {
    let product = store.getState().product;
    if (product.data.name === '' || product.data.type_id === 0) {
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
      <div>
        <EnHeader name="รายละเอียดสินค้า"/>
        <form className="form-inline">
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
                <li><a href="#">Active/Inactive</a></li>
              </ul>
            </div>
          </div>

          <SaveButton onClick={this.onSave.bind(this)} />
       </form>

      <hr/>

      <div className="row">
        <ul className="nav product-nav nav-pills">
          <li className="active">
            <a href="#Information" data-toggle="tab">รายละเอียด</a>
          </li>
          <li>
            <a href="#Stock" data-toggle="tab">สต๊อกสินค้า</a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="Information" className="tab-pane in active">
            <BasicInfo/>
          </div>

          <div id="Stock" className="tab-pane">
            <ProductStock />
          </div>
        </div>
      </div>

      <LoadingWindow/>
    </div>
    );
  }
}

export default ProductInfo;
