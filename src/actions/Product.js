import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {manager} from '../utility/Manager';
import {box} from '../utility/MessageBox';

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
    let url = `${config.api.url}/product?page=${index}&&limit=${limit}`;
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

        } else {
          box.Display('ไม่สามารถบันทึกได้');
        }
      });
    } else {
      let url = `${config.api.url}/product/create`;
      http.post(url, {json, authorization: true}).done(response => {
        manager.ClosePanel('#Loading');
        if (response.statusCode === http.StatusCreated) {
          data._id = response.body._id;
          this.setItem(data);
        } else {
          box.Display('ไม่สามารถบันทึกได้');
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

  selectVariant(index) {
    store.update('PRODUCT_VARIANT_INDEX', {index: +index});
  }

  setVariant(index, variant) {
    store.update('PRODUCT_SET_VARIANT', {index, data: variant});
  }

  addVariant(color) {
    let variant = {
      color,
      list: [],
      image_list: [],
      image_sq_list: [],
    };
    let data = store.getState().product.data;
    data.variant_list.push(variant);
    store.update('PRODUCT_STORE_ITEM', {data: data});
    this.selectVariant(data.variant_list.length - 1);
  }

  editVariant(inVariant, color) {
    let data = store.getState().product.data;
    data.variant_list[inVariant].color = color;
    store.update('PRODUCT_STORE_ITEM', {data: data});
  }

  removeVariant(inVariant) {
    let data = store.getState().product.data;
    data.variant_list.splice(inVariant, 1);

    store.update('PRODUCT_STORE_ITEM', {data: data});
    let index = data.variant_list.length - 1;
    this.selectVariant(index > 0 ? index : undefined);
  }

  addImage(inVariant, img) {
    let data = store.getState().product.data;
    let variant = data.variant_list[inVariant];
    variant.image_list.push(img);
    store.update('PRODUCT_SET_IMAGE', {list: variant.image_list});
  }

  editImage(inVariant, index, img, width, height) {
    let data = store.getState().product.data;
    let variant = data.variant_list[inVariant];
    variant.image_list[index] = img;
    store.update('PRODUCT_SET_IMAGE', {list: variant.image_list});
  }

  removeImage(inVariant, index) {
    let data = store.getState().product.data;
    let variant = data.variant_list[inVariant];
    let list = variant.image_list;
    list.splice(index, 1);
    store.update('PRODUCT_SET_IMAGE', {list: list});
  }

  addSqImage(inVariant, img, width, height) {
    let data = store.getState().product.data;
    let variant = data.variant_list[inVariant];
    variant.image_sq_list.push(img);
    store.update('PRODUCT_SET_SQIMAGE', {list: variant.image_sq_list});
  }

  editSqImage(inVariant, index, img, width, height) {
    let data = store.getState().product.data;
    let variant = data.variant_list[inVariant];
    variant.image_sq_list[index] = img;
    store.update('PRODUCT_SET_SQIMAGE', {list: variant.image_sq_list});
  }

  removeSqImage(inVariant, index) {
    let data = store.getState().product.data;
    let variant = data.variant_list[inVariant];
    let list = variant.image_sq_list;
    list.splice(index, 1);
    store.update('PRODUCT_SET_SQIMAGE', {list: list});
  }
}

export const action = new Product();
