import React from 'react';
//import {Link} from 'react-router'
//import {browserHistory} from 'react-router';
//import {store} from '../../store';

export class BrandContent extends React.Component {

  render() {
    let content = this.props.content.data;
    return (
      <div className="brand-section">
        <div className="row">
          <div className="col-md-12">
            <p className="brand-title">{content.title}</p>
            <p className="brand-description">{content.description}</p>
          </div>
        </div>
     </div>
 );
  }
}

export default BrandContent;
