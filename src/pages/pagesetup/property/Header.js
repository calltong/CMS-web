import React from 'react';

export default class Header extends React.Component {
  render() {

    return (
      <div className="property-header">
        <p>{this.props.name}</p>
      </div>
    );
  }
}
