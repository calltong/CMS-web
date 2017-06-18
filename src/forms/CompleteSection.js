import React from 'react';
import {Link} from 'react-router';

import EnButton from './EnButton';

export class CompleteSection extends React.Component {

  render() {
    return (
    <div>
      <hr/>
      <div className="row">
        <div className="col-md-offset-8 col-md-4">
          <div className="text-right">
            <Link to={this.props.close} className="btn btn-close btn-lg">
              Close
            </Link>
            <EnButton className="btn btn-save btn-lg" onClick={this.props.save} style={{marginLeft:4}}>
              Save
            </EnButton>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default CompleteSection;
