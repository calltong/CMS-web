import React, { Component } from 'react';
import {Link} from 'react-router';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import EnButton from '../../forms/EnButton';
import CreateButton from '../../forms/CreateButton';
import TableEditBtn from '../../forms/TableEditBtn';
import TableRemoveBtn from '../../forms/TableRemoveBtn';
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
          <TableEditBtn to={`SizeManager/${item._id}/Edit`} />
        </td>
        <td style={{textAlign: 'center'}}>
          <TableRemoveBtn onClick={this.onDelete.bind(this, item._id)} />
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
          <div className="col-md-12">
            <EnButton
              className="btn btn-normal"
              onClick={this.updateSize.bind(this)}
              style={{marginRight:'2px'}}>
              Update Size on Product
            </EnButton>
            <CreateButton to={'/SizeManager/Create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
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
