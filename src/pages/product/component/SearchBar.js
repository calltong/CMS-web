import React from 'react';
import {observer, inject} from 'mobx-react';
import Select from 'react-select';

import CreateButton from '../../../forms/button/CreateButton';
import FindButton from '../../../forms/button/FindButton';

export class SearchBar extends React.Component {
  componentDidMount() {
    this.props.ma_type.getList(false);
  }

  typeChange(val) {
    this.props.ma_product.selectType(val.value);
  }

  find() {
    this.props.ma_product.getList();
  }

  render() {
    let type = this.props.ma_type.toJS();
    let product = this.props.ma_product.toJS();
    let list = [{value: 0, label: 'สินค้าทั้งหมด'}];
    for (let item of type.select_list) {
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

          <FindButton onClick={this.find.bind(this)} />
          <CreateButton to={'/product/create'} />
        </form>
      </div>
    );
  }
}

export default inject('ma_product', 'ma_type')(observer(SearchBar));
