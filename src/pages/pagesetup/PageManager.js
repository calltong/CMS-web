import React, { Component } from 'react';
import {Link} from 'react-router';

import CreateSection from '../../forms/CreateSection';
import EnButton from '../../forms/EnButton';
import EnHeader from '../../forms/EnHeader';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

class PageTable extends Component {

  onDelete(id) {
    store.update('PAGE_REMOVE_ITEM', {id});
  }

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
            <Link to={`PageManager/${item._id}/Edit`} className="btn btn-xs btn-default">
              <i className="fa fa-pencil" data-tip="edit"/> Edit
            </Link>
          </td>

          <td style={{textAlign: 'center'}}>
            <EnButton onClick={this.onDelete.bind(this, item._id)} className="btn btn-xs btn-default">
              <i className="fa fa-close" data-tip="delete"/> Del
            </EnButton>
          </td>
        </tr>
        )
      });
    }


    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Updated</th>
            <th>Status</th>
            <th className="col-md-1"></th>
            <th className="col-md-1"></th>
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
    store.update('PAGE_GET_LIST');
  }

  render() {
    let state = store.getState();
    return (
      <div className="container-fluid">
        <EnHeader name="Page Manager"/>

        <div className="row">
          <div className="col-md-8">
            <CreateSection create={`/PageManager/Create`} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="table-responsive">
              <PageTable data={state.page}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageManager;
