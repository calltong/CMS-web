import React, { Component } from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import TableEditBtn from '../../forms/button/TableEditBtn';
import TableRemoveBtn from '../../forms/button/TableRemoveBtn';
import CreateButton from '../../forms/button/CreateButton';
import EnHeader from '../../forms/EnHeader';

class TypeTable extends Component {
  onDelete(id) {
    actions.type.remove(id);
  }

  render() {
    let css = {textAlign: 'center'};
    let data_list = this.props.data.data_list;
    let list = data_list.map(item => {
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

export class TypeManager extends ReducerBase {
  componentDidMount() {
    actions.type.getList();
  }

  render() {
    let data = store.getState().type;
    return (
      <div className="container-fluid">
        <EnHeader name="ชนิดสินค้า"/>

        <div className="row">
          <div className="col-md-8">
            <CreateButton to={'/type/create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="table-responsive" style={{marginTop: 4}}>
              <TypeTable data={data}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TypeManager;
