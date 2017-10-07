import React, { Component } from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import CreateButton from '../../forms/button/CreateButton';
import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';
import HeaderTable from '../../forms/HeaderTable';
import EnHeader from '../../forms/EnHeader';


class ColorTable extends Component {
  onDelete(id) {
    actions.color.remove(id);
  }

  render() {
    let css = {textAlign: 'center'};
    let data_list = this.props.data.data_list;
    let list = data_list.map(item => {
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

export class ColorManager extends ReducerBase {
  componentDidMount() {
    actions.color.getList();
  }

  render() {
    let data = store.getState().color;
    return (
      <div className="container-fluid">
        <EnHeader name="รายการสีของสินค้า"/>

        <div className="row">
          <div className="col-md-6">
            <CreateButton to={'/color/create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="table-responsive" style={{marginTop: 4}}>
              <ColorTable data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorManager;
