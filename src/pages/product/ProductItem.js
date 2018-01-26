import React from 'react';
import {observer, inject} from 'mobx-react';

import {manager} from '../../utility/Manager';

import EnHeader from '../../forms/EnHeader';
import SaveButton from '../../forms/button/SaveButton';
import CloseButton from '../../forms/button/CloseButton';

import BasicInfo from './BasicInfo';
import ProductStock from './ProductStock';
import LoadingWindow from '../../forms/LoadingWindow';

export class ProductItem extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.props.ma_product.getItem(id);
      //actions.ecommerce.checkOnLazada(id);
    } else {
      this.props.ma_product.resetItem();
    }
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.params.id;
    if (id) {
      this.props.ma_product.getItem(id);
      //actions.ecommerce.checkOnLazada(id);
    } else {
      this.props.ma_product.resetItem();
    }
  }

  onSave() {
    let product = this.product;
    if (product.name === '' || product.type_id === 0) {
      //this.setState(this.state);
    } else {
      manager.DisplayPanel('#Loading');
      this.props.ma_product.saveItem();
    }
  }

  onLazadaUpdate() {
    manager.DisplayPanel('#Loading');
    //actions.ecommerce.updateLazada(this.props.params.id);
  }

  onLazadaQuantityUpdate() {
    manager.DisplayPanel('#Loading');
    //actions.ecommerce.updateQuantityLazada(this.props.params.id);
  }

  onLazadaImageUpdate() {
    manager.DisplayPanel('#Loading');
    //actions.ecommerce.updateImageLazada(this.props.params.id);
  }

  render() {
    let product = this.props.ma_product.toJS();
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
            <BasicInfo />
          </div>

          <div id="Stock" className="tab-pane">
            <ProductStock />
          </div>
        </div>
      </div>

      <LoadingWindow />
    </div>
    );
  }
}

export default inject('ma_product')(observer(ProductItem));
