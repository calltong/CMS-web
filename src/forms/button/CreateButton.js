import React from 'react';
import { Link } from 'react-router-dom';

export default class CreateButton extends React.Component {
  render() {
    return (
      <Link to={this.props.to} className="btn btn-menu btn-create" >
        <i className="fa fa-file-text-o"/> สร้าง
      </Link>
    );
  }
}
