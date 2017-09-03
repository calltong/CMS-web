import React from 'react';
import ImageGallery from 'react-image-gallery';
import swal from 'sweetalert';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';
import {actions} from '../../actions/Action';

import Builder from './content/Builder';
import ProductDetail from './ProductDetail';

export default class Product extends ReducerBase {
  componentDidMount() {
    actions.page.main.getProduct();
  }

  increaseQuantity() {
    actions.product.UpQuantity();
  }

  decreaseQuantity() {
    actions.product.DownQuantity();

  }

  selectSize(size) {
    actions.product.SetSize(size);

  }

  selectImage(index) {
    actions.product.SetImage(index);
  }

  AddtoBag() {

    let state = store.getState();
    let product = state.product_info.doc;
    let detail = product.detail;
    let order = state.order.data;
    if (order.status === 'shipping' || order.status === 'done') {
      swal({
        title: 'คุณต้องการเริ่มการสั่งสินค้าใหม่ใช่มัย?',
        text: 'ขณะนี้มีคำสั่งสินค้าเดิมอยู่! คุณต้องการเริ่มการสั่งสินค้าใหม่ใช่มัย?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, เริ่มใหม่',
        closeOnConfirm: false,
      }, function() {
        swal('เริ่มใหม่อีกครั้ง!', '', 'success');
      });
    } else {

      if (detail.size) {
        let list = order.product_list;
        let found = list.find(item => {
          return item.product._id === product.data._id && item.size._id === detail.size._id;
        });
        if (found) {
          swal({
            title: 'สินค้าและขนาดมีอยู่แล้วค่ะ',
            text: '',
            timer: 2000,
            showConfirmButton: true,
          });
        } else {
          store.update('ORDER_ADD_BAG', {
            product:product.data,
            size:detail.size,
            quantity:detail.quantity,
          });
        }
      } else {
        swal({
          title: 'เลือกขนาดสินค้าด้วยนะค่ะ',
          text: '',
          timer: 2000,
          showConfirmButton: true,
        });
      }
    }
  }

  render() {
    let state = store.getState();
    let product = state.product_info;
    let data = product.data;
    let doc = product.doc;
    let images = data.image_list.map(item => {
      return ({
        original: item.data,
        thumbnail: item.data,
      });
    });
    return (
      <div className="product-info">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-1">
            <div className="product-info-header">
              <ImageGallery
                items={images}
                slideDuration={500}
                slideInterval={8000}
                showFullscreenButton={false}
                showPlayButton={false}
                autoPlay={true} />
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-7">
            <ProductDetail
              onSelectSize={this.selectSize.bind(this)}
              onUpQuantity={this.increaseQuantity.bind(this)}
              onDownQuantity={this.decreaseQuantity.bind(this)}
              onAddtoBag={this.AddtoBag.bind(this)} />
          </div>
        </div>

        <hr/>

        <Builder list={doc.data.list} />
      </div>
    );
  }
}
