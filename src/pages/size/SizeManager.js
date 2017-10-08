import React, { Component } from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import CreateButton from '../../forms/button/CreateButton';
import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';
import EnHeader from '../../forms/EnHeader';
import HeaderTable from '../../forms/HeaderTable';

class SizeTable extends Component {
  onDelete(id) {
    actions.size.remove(id);
  }

  render() {
    let css = {textAlign: 'center'};
    let list = this.props.data.data_list.map(item => {
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

export class SizeManager extends ReducerBase {
  componentDidMount() {
    actions.size.getList();
  }

  render() {
    let size = store.getState().size;
    return (
      <div className="container-fluid">
        <EnHeader name="ขนาดสินค้า"/>

        <div className="row">
          <div className="col-md-6">
            <CreateButton to={'/size/create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="table-responsive" style={{marginTop: 4}}>
              <SizeTable data={size}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SizeManager;
