import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Select from 'react-select';

import {store} from '../../store';
import {ReducerBase} from '../../ReducerBase';

export default class ProductDetail extends ReducerBase {
  selectSize(size) {
    this.props.onSelectSize(size);
  }

  render() {
    let state = store.getState();
    let product = state.product;
    let product_info = state.product_info;
    let doc = product_info.doc.data;
    let data = product_info.data;
    let detail = product_info.detail;
    let css = {
      color: doc.css.color,
      backgroundColor: doc.css.bg_color,
      width: '100%',
      zIndex: 0,
      border: '1px solid #ccc',
    };

    let cssText = {
      border: '1px solid #ccc',
    };

    let price = '';
    if (data.sale_price > 0) {
      price = (<h4 className="product-price">ราคา: <strike>&#3647;{data.price}</strike> <span> &#3647;{data.sale_price}</span></h4>);
    } else {
      price = (<h4 className="product-price">ราคา: &#3647;{data.price}</h4>);
    }

    let sizes = product.size_list.map(item => {
      return {value: item._id, label: item.name, clearableValue: false};
    });

    let id = 0;
    if (sizes.length > 0) {
      id = sizes[0].value;
    }

    return (
      <div className="product-info-detail">
        <div className="header">
          <h1>{data.name}</h1>
          {price}
        </div>

        <hr/>
        <div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-5">
              <div className="form-group">
                <label>ขนาดสินค้า</label>
                <Select
                  clearable={false}
                  searchable={false}
                  value={id}
                  options={sizes} />
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-5">
              <div className="form-group">
                <label>จำนวนสินค้า</label>
                <div className="input-group">
                  <div className="input-group-btn">
                    <button type="button"
                      style={css}
                      className="btn"
                      onClick={this.props.onDownQuantity}>
                      <i className="fa fa-minus" style={{marginLeft: 2}}/>
                    </button>
                  </div>

                  <div className="product-quantity" style={cssText} >
                    {detail.quantity}
                  </div>

                  <div className="input-group-btn">
                    <button type="button"
                      style={css}
                      className="btn"
                      onClick={this.props.onUpQuantity} >
                      <i className="fa fa-plus" style={{marginRight: 2}}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-5">
              <button type="button"
                style={css}
                className="btn" >
                ใส่ตะกร้า
              </button>
            </div>
          </div>
        </div>
        <hr/>
        <div>
          {ReactHtmlParser(data.information.value)}
        </div>
      </div>
    );
  }
}
