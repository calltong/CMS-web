import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    console.log('home');
    return (
      <div className="container-fluid">
         <div className="row">
            <div className="col-md-12">
                <h1 className="page-header">
                  Dashboard <small>Statistics Overview</small>
                </h1>
                <ol className="breadcrumb">
                  <li className="active">
                    <i className="fa fa-dashboard"/> Dashboard
                  </li>
                </ol>
            </div>
         </div>
      </div>
    );
  }
}
