import React from 'react';

import SaveButton from './SaveButton';
import CloseButton from './CloseButton';

export class CompleteSection extends React.Component {

  render() {
    return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <SaveButton onClick={this.props.save} />
          <CloseButton to={this.props.close} />
        </div>
      </div>
      <hr/>
    </div>
  );
  }
}

export default CompleteSection;
