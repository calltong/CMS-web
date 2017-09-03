import React from 'react';
import Select from 'react-select';

import {store} from '../../store';
import EnButton from '../../forms/button/EnButton';

export class OrderSearchBar extends React.Component {
  typeChange(event) {
    //let index = event.target.value;
  }

  onFind(condition) {
    store.update('ORDER_GET_LIST', {condition});
  }

  render() {
    let list = [{value: 0, label: 'เลือกสถานะ'}];
    return (
      <form className="form-inline">
        <div className="col-md-2">
          <Select
            clearable={false}
            searchable={false}
            options={list}
            onChange={this.typeChange.bind(this)} />
        </div>

        <input className="form-control" placeholder="Enter Code" style={{marginLeft:'4px', marginRight:'4px'}}/>

        <EnButton className="btn btn-menu btn-normal" style={{marginRight:'4px'}}>
          <i className="fa fa-search" /> Find
        </EnButton>
      </form>
    );
  }
}

export default OrderSearchBar;
