import React from 'react';

import {store} from '../../store';
import EnListBox from '../../forms/EnListBox';
import EnButton from '../../forms/button/EnButton';

export class OrderSearchBar extends React.Component {
  typeChange(event) {
    //let index = event.target.value;
  }

  onFind(condition) {
    store.update('ORDER_GET_LIST', {condition});
  }

  render() {

    let data = ['Created', 'Planning', 'Quatation', 'Payment', 'Install', 'Completed'];
    let index = 1;
    let list = [{id: 0, text: 'เลือกสถานะ'}];
    for (let item of data) {
      list.push(
        {id: index++, text: item}
      );
    }
    return (
      <form className="form-inline">
        <EnListBox
          value={0}
          data={list}
          onSelect={this.typeChange.bind(this)}/>

        <input className="form-control" placeholder="Enter Code" style={{marginLeft:'4px', marginRight:'4px'}}/>

        <EnButton className="btn btn-menu btn-normal" style={{marginRight:'4px'}}>
          <i className="fa fa-search" /> Find
        </EnButton>
      </form>
    );
  }
}

export default OrderSearchBar;
