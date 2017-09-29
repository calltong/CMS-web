import React, { Component } from 'react';
import HeaderBar from './layout/HeaderBar';

class App extends Component {
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
