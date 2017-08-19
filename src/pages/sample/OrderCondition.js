import React from 'react';

export class OrderCondition extends React.Component {
  render() {
    let data = this.props.data;
    let conditions = data.list.map((item, index) => {
      return (<li key={index}>{item.title}</li>);
    });

    return (
      <div className="condition-page">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h4>เงื่อนไขการสั่งซื้อ</h4>
            <ul style={{listStyleType: 'circle'}}>
              {conditions}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCondition;
