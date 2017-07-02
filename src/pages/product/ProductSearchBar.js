import React from 'react';

import {store} from '../../store';
import {actions} from '../../actions/Action';
import {ReducerBase} from '../../ReducerBase';
import CreateButton from '../../forms/CreateButton';
import FindButton from '../../forms/FindButton';
import EnListBox from '../../forms/EnListBox';

export default class ProductSearchBar extends ReducerBase {

  typeChange(event) {
    let index = event.target.value;
    actions.product.selectIndexType(index);
  }

  render() {
    let product = store.getState().product;
    let index = 1;
    let list = [{id: 0, text: 'เลือกชนิดสินค้า'}];
    for (let item of product.type_list) {
      list.push(
        {id: index++, text: item.name}
      );
    }

    return (
      <div>
        <form className="form-inline">
          <EnListBox
            value={product.type.index}
            data={list}
            onSelect={this.typeChange.bind(this)}/>

          <input className="form-control" placeholder="Enter Code" style={{marginLeft:'4px', marginRight:'4px'}}/>

          <FindButton />
          <CreateButton to={'/ProductManager/Create'} />
        </form>
      </div>
    );
  }
}
