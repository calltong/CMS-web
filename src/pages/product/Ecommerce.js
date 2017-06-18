import React from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import EnText from '../../forms/EnText';

export class Ecommerce extends ReducerBase {
  nameChange(event) {
    let data = this.props.data;
    data.lang_eng.name = event.target.value;
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  render() {
    let product = store.getState().product;
    let data = product.data;
    this.data = data;

    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group">
                <label>Name</label>
                <EnText
                  placeholder="Enter english name..."
                  value={data.lang_eng.name}
                  onChange={this.nameChange.bind(this)} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Ecommerce;
