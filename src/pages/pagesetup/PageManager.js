import React, { Component } from 'react';

import TableEditBtn from '../../forms/TableEditBtn';
import EnHeader from '../../forms/EnHeader';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

class PageTable extends Component {
  render() {
    let list = this.props.data.data_list;
    let datalist;
    if (list) {
      datalist = list.map(item => {
        return (
        <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.updated}</td>
          <td>{item.status}</td>
          <td style={{textAlign: 'center'}}>
            <TableEditBtn to={`page/${item._id}/edit`} />
          </td>
        </tr>);
      });
    }


    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Updated</th>
            <th>Status</th>
            <th className="col-md-1"/>
          </tr>
        </thead>
        <tbody>
          {datalist}
        </tbody>
      </table>
    );
  }
}

export class PageManager extends ReducerBase {

  componentDidMount() {
    actions.page.getList();
  }

  render() {
    let page = store.getState().page;
    return (
      <div className="container-fluid">
        <EnHeader name="Page Manager"/>

        <div className="row">
          <div className="col-md-8">
            <div className="table-responsive">
              <PageTable data={page}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageManager;
