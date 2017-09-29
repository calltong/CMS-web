import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {manager} from '../utility/Manager';
import {messageBox} from '../utility/MessageBox';

export class Stock {
  resetItem() {
    store.update('STOCK_RESET_ITEM');
  }

  refresh() {
    store.update('STOCK_REFRESH');
  }

  setItem(data) {
    store.update('STOCK_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/stock/${id}/get`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    let data = store.getState().stock.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/stock/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        manager.ClosePanel('#Loading');
        if (response.statusCode === http.StatusOK) {
          messageBox.Display('บันทึกเรียบร้อย');
        } else {
          messageBox.Display('ไม่สามารถบันทึกได้');
        }
      });
    } else {
      let url = `${config.api.url}/stock/create`;
      http.post(url, {json, authorization: true}).done(response => {
        manager.ClosePanel('#Loading');
        if (response.statusCode === http.StatusCreated) {
          messageBox.Display('บันทึกเรียบร้อย');
          data._id = response.body._id;
          this.setItem(data);
        } else {
          messageBox.Display('ไม่สามารถบันทึกได');
        }
      });
    }
  }

  remove(id) {
    let url = `${config.api.url}/stock/${id}/delete`;
    http.delete(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {

      }
    });
  }

  selectVariant(index) {
    store.update('STOCK_VARIANT_INDEX', {index: +index});
  }

  setVariant(index, variant) {
    store.update('STOCK_SET_VARIANT', {index, data: variant});
  }

  addVariant(color) {
    let variant = {
      color,
      list: [],
      image_list: [],
      image_sq_list: [],
    };
    store.update('STOCK_ADD_VARIANT', {data: variant});
  }

  addImage(inVariant, img) {
    let data = store.getState().stock.data;
    let variant = data.variant_list[inVariant];
    variant.image_list.push(img);
    store.update('STOCK_SET_IMAGE', {list: variant.image_list});
  }

  editImage(inVariant, index, img, width, height) {
    let data = store.getState().stock.data;
    let variant = data.variant_list[inVariant];
    variant.image_list[index] = img;
    store.update('STOCK_SET_IMAGE', {list: variant.image_list});
  }

  removeImage(inVariant, index) {
    let data = store.getState().stock.data;
    let variant = data.variant_list[inVariant];
    let list = variant.image_list;
    list.splice(index, 1);
    store.update('STOCK_SET_IMAGE', {list: list});
  }

  addSqImage(inVariant, img, width, height) {
    let data = store.getState().stock.data;
    let variant = data.variant_list[inVariant];
    variant.image_sq_list.push(img);
    store.update('STOCK_SET_SQIMAGE', {list: variant.image_sq_list});
  }

  editSqImage(inVariant, index, img, width, height) {
    let data = store.getState().stock.data;
    let variant = data.variant_list[inVariant];
    variant.image_sq_list[index] = img;
    store.update('STOCK_SET_SQIMAGE', {list: variant.image_sq_list});
  }

  removeSqImage(inVariant, index) {
    let data = store.getState().stock.data;
    let variant = data.variant_list[inVariant];
    let list = variant.image_sq_list;
    list.splice(index, 1);
    store.update('STOCK_SET_SQIMAGE', {list: list});
  }
}

export const action = new Stock();
