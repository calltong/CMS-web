import {browserHistory} from 'react-router';

import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {manager} from '../utility/Manager';

export class ProductAction {
  getTypeList(load) {
    let product = store.getState().product;
    if (product.type_list.length === 0 || load === true) {
      let url = `${config.api.url}/protype`;
      http.get(url).done(response => {
        if (response.statusCode === http.StatusOK) {
          let list = response.body;
          store.update('PRODUCT_STORE_TYPE', {list});
        }
      });
    }
  }

  getSizeList(load) {
    let product = store.getState().product;
    if (product.size_list.length === 0 || load === true) {
      let url = `${config.api.url}/prosize`;
      http.get(url).done(response => {
        if (response.statusCode === http.StatusOK) {
          let list = response.body;
          store.update('PRODUCT_STORE_SIZE', {list});
        }
      });
    }
  }

  refresh() {
    store.update('PRODUCT_REFRESH');
  }

  resetItem() {
    store.update('PRODUCT_RESET_ITEM');
  }

  clearMessage() {
    store.update('PRODUCT_SET_MASSAGE', {type: '', text: ''});
  }

  setMessage(type, message) {
    store.update('PRODUCT_SET_MASSAGE', {type: type, text: message});
  }

  getCountAndList(index) {
    let product = store.getState().product;
    let url = `${config.api.url}/product/get/count`;
    http.get(url).done(response => {
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
    let url = `${config.api.url}/product?page=${index}&&limit=${limit}`;
    http.get(url).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body;
        store.update('PRODUCT_STORE_LIST', {list});
      }
    });
  }

  setItem(data) {
    if (!data.image_square_list) {
      data.image_square_list = [];
    }
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/product/${id}`;
    http.get(url).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    this.clearMessage();
    let product = store.getState().product;
    let data = product.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/product/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        manager.ClosePanel('#Loading');
        if (response.statusCode === http.StatusOK) {
          this.setMessage('info', 'Completed');
          //browserHistory.push(`/ProductManager?page=${product.page.index}`);
        } else {
          this.setMessage('error', 'Not Completed');
        }
      });
    } else {
      let url = `${config.api.url}/product/create`;
      http.post(url, {json, authorization: true}).done(response => {
        manager.ClosePanel('#Loading');
        if (response.statusCode === http.StatusCreated) {
          this.setMessage('info', 'Completed');
          id = response.body._id;
          //browserHistory.push(`/ProductManager/${id}/Edit`);
          browserHistory.push(`/ProductManager?page=${product.page.index}`);
        } else {
          this.setMessage('error', 'Not Completed');
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

  addImage(img, width, height) {
    let product = store.getState().product;
    let data = product.data;
    let image = {
      status: true,
      data: img,
      width: width,
      height: height,
    };
    data.image_list.push(image);
    store.update('PRODUCT_SET_IMAGE', {list: data.image_list});
  }

  editImage(index, img, width, height) {
    let product = store.getState().product;
    let data = product.data;
    let image = {
      status: true,
      data: img,
      width: width,
      height: height,
    };
    data.image_list[index] = image;
    store.update('PRODUCT_SET_IMAGE', {list: data.image_list});
  }

  removeImage(index) {
    let product = store.getState().product;
    let data = product.data;
    let list = data.image_list;
    list.splice(index, 1);
    store.update('PRODUCT_SET_IMAGE', {list: list});
  }

  addSqImage(img, width, height) {
    let product = store.getState().product;
    let data = product.data;
    let image = {
      status: true,
      data: img,
      width: width,
      height: height,
    };
    data.image_square_list.push(image);
    store.update('PRODUCT_SET_SQIMAGE', {list: data.image_square_list});
  }

  editSqImage(index, img, width, height) {
    let product = store.getState().product;
    let data = product.data;
    let image = {
      status: true,
      data: img,
      width: width,
      height: height,
    };
    data.image_square_list[index] = image;
    store.update('PRODUCT_SET_SQIMAGE', {list: data.image_square_list});
  }

  removeSqImage(index) {
    let product = store.getState().product;
    let data = product.data;
    let list = data.image_square_list;
    list.splice(index, 1);
    store.update('PRODUCT_SET_SQIMAGE', {list: list});
  }

  updateSize() {
    let url = `${config.api.url}/product/updatesize`;
    http.put(url, {authorization: true}).done(response => {
      console.log(response.statusCode, ':Text:', response.body);
      //if (response.statusCode === http.StatusOK) {
      //  console.log('Text:', response.body);
      //}
    });
  }
}

export const action = new ProductAction();
