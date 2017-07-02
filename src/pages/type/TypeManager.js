import React, { Component } from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import EnButton from '../../forms/EnButton';
import TableEditBtn from '../../forms/TableEditBtn';
import TableRemoveBtn from '../../forms/TableRemoveBtn';
import CreateButton from '../../forms/CreateButton';
import EnHeader from '../../forms/EnHeader';

class TypeTable extends Component {
  onDelete(id) {
    actions.type.remove(id);
  }

  render() {
    let data_list = this.props.data.data_list;
    let list = data_list.map(item => {
      return (
        <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.lang_eng.name}</td>
          <td>{item.tag_list}</td>
          <td style={{textAlign: 'center'}}>
            <TableEditBtn to={`TypeManager/${item._id}/Edit`} />
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
            <th>Name (Eng)</th>
            <th>Default Tags</th>
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
        <EnHeader name="Type Manager"/>

        <div className="row">
          <div className="col-md-8">
            <CreateButton to={'/TypeManager/Create'} />
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
