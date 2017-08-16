import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export class AboutUs extends React.Component {
  render() {
    let data = this.props.data;
    let list = data.list.map((item, index) => {
      return (
      <div key={index + 10}>
        <hr />
        <br />
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6">
            <img className="aboutus-map" src={item.preview} role="presentation" />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6">
            <h3>{item.title}</h3>
            <div>{ReactHtmlParser(item.description)}</div>
          </div>
        </div>
      </div>
      );
    });
    return (
      <div className="aboutus-page">
        <br />
        <div className="row">
          <div className="col-md-12">
            <h3>{data.title}</h3>
            <div>{ReactHtmlParser(data.description)}</div>
          </div>
        </div>
        <br />
        {list}
      </div>
    );
  }
}

export default AboutUs;
