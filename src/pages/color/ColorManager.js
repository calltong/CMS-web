import React, { Component } from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import CreateSection from '../../forms/CreateSection';
import EnButton from '../../forms/EnButton';
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
          <Link to={`ColorManager/${item._id}/Edit`} className="btn btn-xs btn-default">
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


    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th className="col-md-1"></th>
            <th className="col-md-1"></th>
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
    let state = store.getState();
    return (
      <div className="container-fluid">
        <EnHeader name="Color Manager"/>

        <div className="row">
          <div className="col-md-5">
            <CreateSection create={`/ColorManager/Create`} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <div className="table-responsive">
              <ColorTable
                data={state.color}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorManager;
