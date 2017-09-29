import {browserHistory} from 'react-router';

import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {manager} from '../utility/Manager';
import {messageBox} from '../utility/MessageBox';

export class Product {
  refresh() {
    store.update('PRODUCT_REFRESH');
  }

  resetItem() {
    store.update('PRODUCT_RESET_ITEM');
  }

  getCountAndList(index) {
    let product = store.getState().product;
    let url = `${config.api.url}/product/count`;
    if (product.page.condition.type_id !== 0) {
      url = `${url}?type=${product.page.condition.type_id}`;
    }

    console.log('product c url:', url);
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        product.page.total = +data.value;
        store.update('PRODUCT_STORE_PAGE', {data: product.page});
        this.getList(index);
      }
    });
  }

  getList(index) {
    let product = store.getState().product;
    product.page.index = index;
    store.update('PRODUCT_STORE_PAGE', {data: product.page});

    let limit = product.page.limit;
    let url = `${config.api.url}/product/full?page=${index}&&limit=${limit}`;
    if (product.page.condition.type_id !== 0) {
      url = `${url}&type=${product.page.condition.type_id}`;
    }

    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body;
        store.update('PRODUCT_STORE_LIST', {list});
      }
    });
  }

  setItem(data) {
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/product/${id}/get`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    let product = store.getState().product;
    let data = product.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/product/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        manager.ClosePanel('#Loading');
        if (response.statusCode === http.StatusOK) {
          messageBox.Display('บันทึกเรียบร้อย');
        } else {
          messageBox.Display('ไม่สามารถบันทึกได้');
        }
      });
    } else {
      let url = `${config.api.url}/product/create`;
      http.post(url, {json, authorization: true}).done(response => {
        manager.ClosePanel('#Loading');
        if (response.statusCode === http.StatusCreated) {
          messageBox.Display('บันทึกเรียบร้อย');
          id = response.body._id;
          browserHistory.push(`/ProductManager?page=${product.page.index}`);
        } else {
          messageBox.Display('ไม่สามารถบันทึกได้');
        }
      });
    }
  }

  remove(id) {
    let product = store.getState().product;
    let url = `${config.api.url}/product/${id}/delete`;
    http.delete(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        this.getCountAndList(product.page.index, product.page.limit, product.page.condition);
      }
    });
  }

  selectSize(index) {
    store.update('PRODUCT_SET_SIZE', {index: +index});
  }

  selectType(id) {
    store.update('PRODUCT_SET_TYPE', {id: id});
    this.getCountAndList(1);
  }

  updateData() {
    let url = `${config.api.url}/product/update`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        this.getList();
      }
    });
  }
}

export const action = new Product();
