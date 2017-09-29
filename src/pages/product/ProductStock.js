import React from 'react';
//import Select from 'react-select';

import {store} from '../../store';
import {ReducerBase} from '../../ReducerBase';
import ProductVariant from './ProductVariant';
//import EnText from '../../forms/EnText';

export default class ProductStock extends ReducerBase {
  render() {
    let state = store.getState();
    let stock = state.stock.data;
    let index = state.stock.index;
    let section = <div />;
    if (stock.variant_list.length > 0) {
      let colors = stock.variant_list.map(item => {
        return {value: item.color._id, label: item.color.content.main.name, clearableValue: false};
      });

      let variant = stock.variant_list[index];
      section = (
        <ProductVariant
          index={index}
          size_list={state.size.data_list}
          sizes={state.size.select_list}
          colors={colors}
          variant={variant} />
        );
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            {section}
          </div>
        </div>
      </div>
    );
  }
}
