import React from 'react';
import { Link } from 'react-router-dom';

export default class CloseButton extends React.Component {
  render() {
    return (
      <Link className="btn btn-menu btn-close" to={this.props.to}>
        <i className="fa fa-level-up" /> ปิด
      </Link>
    );
  }
}
