import React from 'react';

import CreateButton from '../../forms/button/CreateButton';
import SizeTable from './SizeTable';
import EnHeader from '../../forms/EnHeader';

export default class SizeManager extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <EnHeader name="ขนาดสินค้า"/>

        <div className="row">
          <div className="col-md-6">
            <CreateButton to={'/size/create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="table-responsive" style={{marginTop: 4}}>
              <SizeTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
