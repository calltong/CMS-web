import React, { Component } from 'react';
import HeaderBar from './layout/HeaderBar';

import {actions} from './actions/Action';

class App extends Component {
  componentDidMount() {
    actions.product.getTypeList();
    actions.product.getSizeList();
  }

  render() {
    return (
      <div id="wrapper">
        <HeaderBar active={this.props.location.pathname}/>
        <div id="page-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
