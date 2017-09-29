import React from 'react';
import Select from 'react-select';

import {store} from '../../store';
import {actions} from '../../actions/Action';
import {ReducerBase} from '../../ReducerBase';
import CreateButton from '../../forms/button/CreateButton';
import FindButton from '../../forms/button/FindButton';

export default class ProductSearchBar extends ReducerBase {
  typeChange(val) {
    actions.product.selectType(val.value);
  }

  updateData() {
    actions.product.updateData();
  }

  render() {
    let state = store.getState();
    let product = state.product;
    let select = state.type.select_list;
    let list = [{value: 0, label: 'สินค้าทั้งหมด'}];
    for (let item of select) {
      list.push(item);
    }

    return (
      <div>
        <form className="form-inline">
          <div className="col-md-2" style={{paddingRight: 0, paddingLeft: 0}}>
            <Select
              clearable={false}
              searchable={false}
              value={product.page.condition.type_id}
              options={list}
              onChange={this.typeChange.bind(this)} />
          </div>
          <input className="form-control" placeholder="Enter Code" style={{marginLeft:'4px', marginRight:'4px'}}/>

          <FindButton onClick={this.updateData.bind(this)} />
          <CreateButton to={'/product/create'} />
        </form>
      </div>
    );
  }
}
