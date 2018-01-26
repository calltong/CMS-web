import React from 'react';

import CreateButton from '../../forms/button/CreateButton';
import ColorTable from './ColorTable';
import EnHeader from '../../forms/EnHeader';

export default class ColorManager extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <EnHeader name="รายการสีของสินค้า"/>

        <div className="row">
          <div className="col-md-6">
            <CreateButton to={'/color/create'} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="table-responsive" style={{marginTop: 4}}>
              <ColorTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
