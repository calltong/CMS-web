import React from 'react';

import {store} from '../../store';
import EnButton from '../../forms/EnButton';

export class OrderSearchBar extends React.Component {
  onFind(condition) {
    store.update('ORDER_GET_LIST', {condition});
  }

  render() {
    let order = store.getState().order;
    let condition = order.condition;

    let data = ['Order', 'Payment', 'Sent', 'Completed', 'Reject'];
    let list = data.map(item => {
      return (
        <EnButton
          key={item}
          onClick={this.onFind.bind(this, item)}
          className={condition===item? 'btn btn-active-selected': 'btn btn-selected'} style={{marginRight:2, width:120}}>
          {item}
        </EnButton>
      );
    });
    return (
      <div style={{marginBottom:4}}>
        {list}
      </div>
    )
  }
}

export default OrderSearchBar;
