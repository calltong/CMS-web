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

  render() {
    let product = store.getState().product;
    let list = [{value: 0, label: 'สินค้าทั้งหมด'}];
    for (let item of product.type_list) {
      list.push(
        {value: item._id, label: item.name}
      );
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

          <FindButton />
          <CreateButton to={'/ProductManager/Create'} />
        </form>
      </div>
    );
  }
}
