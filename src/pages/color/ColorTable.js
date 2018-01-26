import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';
import HeaderTable from '../../forms/HeaderTable';

class ColorTable extends Component {
  componentDidMount() {
    this.props.ma_color.getList();
  }

  onDelete(id) {
    this.props.ma_color.remove(id);
  }

  render() {
    let css = {textAlign: 'center'};
    let data = this.props.ma_color.toJS();
    let list = data.list.map(item => {
      let cssColor = {
        backgroundColor: item.code,
        border: '1px solid #ccc',
        width: '90%',
        height: '25px',
      };
      return (
        <tr key={item._id}>
          <td><button className="btn" style={cssColor} /></td>
          <td>{item.content.main.name}</td>
          <td>{item.content.english.name}</td>
          <td style={css}>
            <TableEditBtn to={`color/${item._id}/edit`} />
          </td>
          <td style={css}>
            <TableRemoveBtn onClick={this.onDelete.bind(this, item._id)} />
          </td>
        </tr>
      );
    });

    let header = [
      {name: 'รหัสสี', width: 80},
      {name: 'ชื่อ', width: 150},
      {name: 'ชื่อ Eng', width: 150},
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

export default inject('ma_color')(observer(ColorTable));
