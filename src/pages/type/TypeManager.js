import React, { Component } from 'react';

import TypeTable from './TypeTable';
import CreateButton from '../../forms/button/CreateButton';
import EnHeader from '../../forms/EnHeader';

export default class TypeManager extends Component {
  render() {
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
              <TypeTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
