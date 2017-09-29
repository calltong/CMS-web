import React, { Component } from 'react';

export default class HeaderTable extends Component {
  render() {
    let list = this.props.list.map((item, index) => {
      let c = 'no-print';
      if (item.printHide === true) {
        c = 'no-print-column';
      }
      let css = {width: `${item.width}px`, textAlign: 'center'};
      return (
        <th className={c} style={css} key={index}>{item.name}</th>
      );
    });
    return (
      <tr>
        {list}
      </tr>
    );
  }
}
