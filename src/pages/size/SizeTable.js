import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';
import HeaderTable from '../../forms/HeaderTable';

class SizeTable extends Component {
  componentDidMount() {
    this.props.ma_size.getList();
  }

  onDelete(id) {
    this.props.ma_size.remove(id);
  }

  render() {
    let data = this.props.ma_size.toJS();
    let css = {textAlign: 'center'};
    let list = data.list.map(item => {
      return (
      <tr key={item._id}>
        <td>{item.code}</td>
        <td>{item.content.main.name}</td>
        <td style={css}>
          <TableEditBtn to={`size/${item._id}/edit`} />
        </td>
        <td style={css}>
          <TableRemoveBtn onClick={this.onDelete.bind(this, item._id)} />
        </td>
      </tr>);
    });

    let header = [
      {name: 'Code', width: 80},
      {name: 'ชื่อ', width: 150},
      {name: ' ', width: 60, printHide: true},
      {name: ' ', width: 60, printHide: true},
    ];

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <HeaderTable list={header} />
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    );
  }
}

export default inject('ma_size')(observer(SizeTable));
