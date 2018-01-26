import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';

class TypeTable extends Component {
  componentDidMount() {
    this.props.ma_type.getList();
  }

  onDelete(id) {
    this.props.ma_type.remove(id);
  }

  render() {
    let css = {textAlign: 'center'};
    let data = this.props.ma_type.toJS();
    let list = data.list.map(item => {
      return (
        <tr key={item._id}>
          <td>{item.content.main.name}</td>
          <td>{item.content.english.name}</td>
          <td style={css}>
            <TableEditBtn to={`type/${item._id}/edit`} />
          </td>
          <td style={css}>
            <TableRemoveBtn onClick={this.onDelete.bind(this, item._id)} />
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>ชื่อ(Eng)</th>
            <th className="col-md-1" />
            <th className="col-md-1" />
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    );
  }
}

export default inject('ma_type')(observer(TypeTable));
