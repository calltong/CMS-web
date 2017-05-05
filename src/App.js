import React, { Component } from 'react';
import HeaderBar from './layout/HeaderBar';
import SideBar from './layout/SideBar';

class App extends Component {
  /*
  componentWillMount() {
      console.log('Component WILL MOUNT!')
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {
      console.log('Component WILL RECIEVE PROPS!')
   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }
*/
  render() {
    return (
      <div id="wrapper">
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <HeaderBar/>
          <SideBar active={this.props.location.pathname}/>
        </nav>
        <div id="page-wrapper">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
