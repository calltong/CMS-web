import React from 'react';

import {actions} from '../../actions/Action';
import {store} from '../../store';
import {ReducerBase} from '../../ReducerBase';
import ProductVariant from './ProductVariant';
import ColorDialog from '../../dialog/ColorDialog';

export default class ProductStock extends ReducerBase {
  onAddColor(color, item) {
    actions.product.addVariant(color);
  }

  getColorToAdd() {
    actions.dialog.resetColor();
    actions.dialog.setConfirmColor(this.onAddColor, this.props.index, this.colors);
  }

  render() {
    let state = store.getState();
    let product = state.product.data;
    let index = state.product.variant.index;
    let section = <div />;
    this.colors = [];
    if (product.variant_list.length > 0) {
      this.colors = product.variant_list.map(item => {
        return {value: item.color._id, label: item.color.content.main.name, clearableValue: false};
      });

      let variant = product.variant_list[index];
      section = (
        <ProductVariant
          index={index}
          size_list={state.size.data_list}
          sizes={state.size.select_list}
          colors={this.colors}
          variant={variant} />
        );
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <button
              className="btn btn-normal"
              style={{width: '100%'}}
              data-toggle="modal" data-target="#choose_color"
              onClick={this.getColorToAdd.bind(this)}>
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
        <ColorDialog />
      </div>
    );
  }
}
