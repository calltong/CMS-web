import React from 'react';

import {ReducerBase} from '../ReducerBase';

export class OrderCondition extends ReducerBase {
  render() {
    let content = this.props.content;
    let conditions = content.list.map((item, index) => {
      return (<li key={index}>{item}</li>);
    });

    return (
      <div className="help-page">
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
