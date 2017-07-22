import React from 'react';
import {Link} from 'react-router';

export class CreateSection extends React.Component {

  render() {
    return (
      <div style={{marginBottom:4}}>
        <Link to={this.props.create} className="btn btn-menu btn-create" >
          <i className="fa fa-plus"/> Create
        </Link>
      </div>
    );
  }
}

export default CreateSection;
