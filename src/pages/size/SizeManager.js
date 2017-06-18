import React, { Component } from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import CreateSection from '../../forms/CreateSection';
import EnButton from '../../forms/EnButton';
import EnHeader from '../../forms/EnHeader';

class SizeTable extends Component {
  onDelete(id) {
    actions.size.remove(id);
  }

  render() {

    let list = this.props.data.data_list.map(item => {
      return (
      <tr key={item._id}>
        <td>{item.code}</td>
        <td>{item.name}</td>
        <td style={{textAlign: 'center'}}>
          <Link to={`SizeManager/${item._id}/Edit`} className="btn btn-xs btn-default">
            <i className="fa fa-pencil" data-tip="edit"/> Edit
          </Link>
        </td>
        <td style={{textAlign: 'center'}}>
          <EnButton onClick={this.onDelete.bind(this, item._id)} className="btn btn-xs btn-default">
            <i className="fa fa-close" data-tip="delete"/> Del
          </EnButton>
        </td>
      </tr>);
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
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

export class SizeManager extends ReducerBase {
  componentDidMount() {
    actions.size.getList();
  }

  updateSize() {
    actions.product.updateSize();
  }

  render() {
    let size = store.getState().size;
    return (
      <div className="container-fluid">
        <EnHeader name="Size Manager"/>

        <div className="row">
          <div className="col-md-2">
            <EnButton className="btn btn-create" onClick={this.updateSize.bind(this)}>
              Update Size on Product
            </EnButton>
          </div>
          <div className="col-md-6">
            <CreateSection create={'/SizeManager/Create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <SizeTable data={size}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SizeManager;
