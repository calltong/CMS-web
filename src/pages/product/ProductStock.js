import React from 'react';
import {observer, inject} from 'mobx-react';

import ProductVariant from './ProductVariant';
import ColorDialog from '../../dialog/ColorDialog';

export class ProductStock extends React.Component {
  onAddColor(item) {
    this.props.ma_product.addVariant(item);
  }

  render() {
    let product = this.props.ma_product.toJS();
    let edit = product.edit;
    let data = product.data;
    let section;
    if (edit.variant.index >= 0) {
      section = (<ProductVariant />);
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <button
              className="btn btn-normal"
              style={{width: '100%'}}
              data-toggle="modal" data-target="#choose_color">
              <i className="fa fa-plus" /> เพิ่มสี
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            {section}
          </div>
        </div>
        <ColorDialog
          id="choose_color"
          list={edit.colors}
          onSelected={this.onAddColor.bind(this)} />
      </div>
    );
  }
}

export default inject('ma_product')(observer(ProductStock));
