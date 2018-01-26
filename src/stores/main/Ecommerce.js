import BaseStore from '../BaseStore';

import {config} from '../../config';
import {http} from '../../utils/http';
import {manager} from '../../utility/Manager';
import {box} from '../../utility/MessageBox';


export class Ecommerce extends BaseStore {
  constructor() {
    super();
    this.observable({
      message: '',
    });
  }

  async updateLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/update`;
    let response = await http.put(url, {authorization: true});
    manager.ClosePanel('#Loading');
    if (response.statusCode === 200) {
      box.Display('Completed');
    } else {
      box.Display(response.body.result);
    }
  }

  async updateQuantityLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/quantity`;
    let response = await http.put(url, {authorization: true});
    manager.ClosePanel('#Loading');
    if (response.statusCode === 200) {
      box.Display('Completed');
    } else {
      box.Display(response.body.result);
    }
  }

  async updateImageLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/image`;
    let response = await http.put(url, {authorization: true});
    if (response.statusCode === 200) {
      box.Display('Completed');
    } else {
      box.Display(response.body.result);
    }
  }

  async checkOnLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/check`;
    let response = await http.get(url, {authorization: true});
    return response.statusCode === 200;
  }
}

export default new Ecommerce();
