import React from 'react';

import EnImageSelector from '../../../forms/EnImageSelector';
import {ReducerBase} from '../../../ReducerBase';
import {store} from '../../../store';

export class PaymentRegister extends ReducerBase {
  onDropImage(files) {
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
    };
    reader.readAsDataURL(files[0]);
  }

  onBack() {

  }

  onNext() {

  }

  getBankName(bank) {
    switch (bank) {
      case 'scb':
        return '‎ไทยพาณิชย์';
      case 'kbank':
        return 'กสิกรไทย';
      case 'bbl':
        return 'กรุงเทพฯ';
      case 'bay':
        return 'กรุงศรีอยุธยา';
      default:
        return '';
    }
  }

  render() {
    let state = store.getState();
    let payment = state.payment.doc;
    let data = {
      payment: {
        data: {
          slip: '',
        },
      },
    };
    let list = payment.data.list.map((item, index) => {
      return (
        <div className="row" key={index} >
          <div className="col-xs-4 col-sm-4 col-md-4">
            <p>{this.getBankName(item.bank)}</p>
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8">
            <p>{item.number}</p>
            <p>{item.name}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="panel panel-customer">
        <div className="panel-heading">
          ชำระเงิน
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="form-group" style={{margin:'0 auto', width: '80%'}}>
                <label>หลักฐานชำระเงิน/Slip</label>
                <div style={{border: '1px solid #ccc'}} >
                  <EnImageSelector
                    maxWidth="210px" maxHeight="210px" lineHeight="210px"
                    src={data.payment.data.slip}
                    onDrop={this.onDropImage.bind(this)} />
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="form-group" style={{margin:'0 auto', width: '80%'}}>
                <label>ธนาคาร</label>
                <div>
                  {list}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-4">
              <button
                type="button"
                className="btn btn-normal btn-summary-size pull-left"
                onClick={this.onBack.bind(this)} >
                กลับ
              </button>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-4 col-md-offset-4">
              <button
                type="button"
                className="btn btn-normal btn-summary-size pull-right"
                onClick={this.onNext.bind(this)} >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentRegister;
