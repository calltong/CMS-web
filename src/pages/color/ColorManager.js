import React, { Component } from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import CreateButton from '../../forms/CreateButton';
import EnButton from '../../forms/EnButton';
import TableEditBtn from '../../forms/TableEditBtn';
import TableRemoveBtn from '../../forms/TableRemoveBtn';
import EnHeader from '../../forms/EnHeader';


class ColorTable extends Component {
  onDelete(id) {
    store.update('COLOR_REMOVE_ITEM', {id});
  }

  render() {
    let data_list = this.props.data.data_list;
    let list = data_list.map(item => {
      return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td style={{textAlign: 'center'}}>
          <TableEditBtn to={`ColorManager/${item._id}/Edit`} />
        </td>
        <td style={{textAlign: 'center'}}>
          <TableRemoveBtn onClick={this.onDelete.bind(this, item._id)} />
        </td>
      </tr>
    );
    });


    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th className="col-md-1"/>
            <th className="col-md-1"/>
          </tr>
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
    store.update('COLOR_GET_LIST', {index: 1});
  }

  render() {
    let data = store.getState().color;
    return (
      <div className="container-fluid">
        <EnHeader name="Color Manager"/>

        <div className="row">
          <div className="col-md-5">
            <CreateButton to={'/ColorManager/Create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
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
