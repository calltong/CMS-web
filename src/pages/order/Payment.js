import React from 'react';
import EnImage from '../../forms/EnImage';

export default class Payment extends React.Component {

  render() {
    let data = this.props.data;
    let slip = '';
    let section;
    if (data.payment) {
      slip = data.payment.data.slip;
    }
    let css = {
      maxWidth: '290px',
      maxHight: '380px',
    };

    if (slip !== '') {
      section = <EnImage style={css} src={slip} />;
    } else {
      section = <p>รอการชำระเงิน</p>;
    }
    return (
      <div>
        <div className="order-header">
          <p>สถานะการชำระเงิน</p>
        </div>

        {section}
      </div>
    );
  }

}
