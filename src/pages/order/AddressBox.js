import React, {Component} from 'react';

import Input from '../../forms/EnText';
import TextArea from '../../forms/EnTextArea';

class SectionHeader extends Component {
  render() {
    return (
      <div style={{marginTop: 15}}>
        {this.props.title}
        <hr style={{marginTop: 10}}/>
      </div>
    );
  }
}

export default class AddressBox extends Component {

  render() {
    let data = this.props.data;
    let css = {
      label: 'control-label col-md-3',
      control: 'col-md-8',
    };

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Customer Information</div>

        <div className="panel-body">
          <form className="form-horizontal">
            <SectionHeader title="Contact Information"/>
            <div className="form-group">
              <label className={css.label}>Name</label>
              <div className={css.control}>
                <Input value={data.recipient.name}/>
              </div>
            </div>

            <div className="form-group">
              <label className={css.label}>Phone</label>
              <div className={css.control}>
                <Input value={data.recipient.phone}/>
              </div>
            </div>

            <div className="form-group">
              <label className={css.label}>Email</label>
              <div className={css.control}>
                <Input value={data.account.email}/>
              </div>
            </div>

            <SectionHeader title="Shipping Address"/>
            <div className="form-group">
              <label className={css.label}>Address</label>
              <div className={css.control}>
                <TextArea rows="5" value={data.recipient.address}/>
              </div>
            </div>

            <div className="form-group">
              <label className={css.label}>Province</label>
              <div className={css.control}>
                <Input value={data.recipient.province}/>
              </div>
            </div>

            <div className="form-group">
              <label className={css.label}>Postcode</label>
              <div className={css.control}>
                <Input value={data.recipient.postcode}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
