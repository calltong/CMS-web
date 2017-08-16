import React from 'react';

export class HowToBuy extends React.Component {
  render() {
    let data = this.props.data;
    let list = data.list.map((item, index) => {
      return (
        <div className="col-xs-6 col-sm-6 col-md-3" key={index}>
          <div className="tobuy-step">
            <span>{index + 1}</span>
            <p>{item.title}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="tobuy-page">

        <div className="row">
          {list}
        </div>

      </div>
    );
  }
}

export default HowToBuy;
