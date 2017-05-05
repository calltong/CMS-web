import React from 'react';
import {Link} from 'react-router';

import {store} from '../../store';
import {ReducerBase} from '../../ReducerBase';
import EnButton from '../../forms/EnButton';
import EnListBox from '../../forms/EnListBox';

export default class ProductSearchBar extends ReducerBase {

  sizeChange(event) {
    let index = event.target.value;
    store.update('PRODUCT_SET_SIZEPAGE', {index: index});
  }

  render() {
    let ob = store.getState().product;
    let index = 0;
    let sizeList = ob.size_list.map(item => {
      return {id:index++, text:item.name};
    });
    return (
      <div className="row">
        <div className="col-md-1">
          <Link to={`/ProductManager/Create`} className="btn btn-create" >
            <i className="fa fa-plus"/> Create</Link>
        </div>
        <div className="col-md-2">
          <EnListBox
            value={ob.size.index}
            data={sizeList}
            onSelect={this.sizeChange.bind(this)}/>
        </div>
        <div className="col-md-1">
          <EnButton className="btn btn-normal">
            <i className="fa fa-find" />Find
          </EnButton>
        </div>
      </div>
    );
  }
}
