import React from 'react';
import {Link} from 'react-router';

export default class SaveButton extends React.Component {
  render() {
    return (
      <Link className="btn btn-menu btn-close" to={this.props.close}>
        <i className="fa fa-level-up" /> Close
      </Link>
    );
  }
}
