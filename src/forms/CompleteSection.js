import React from 'react';

import SaveButton from './button/SaveButton';
import CloseButton from './button/CloseButton';

export class CompleteSection extends React.Component {

  render() {
    return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <CloseButton to={this.props.close} />
          <SaveButton onClick={this.props.save} />
        </div>
      </div>
      <hr/>
    </div>
  );
  }
}

export default CompleteSection;
