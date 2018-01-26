import React from 'react';
import { Link } from 'react-router-dom';

export default class TableEditBtn extends React.Component {
  render() {
    return (
      <Link to={this.props.to} className="btn btn-table btn-fullsize btn-edit">
        <i className="fa fa-pencil" data-tip="edit"/> Edit
      </Link>
    );
  }
}
