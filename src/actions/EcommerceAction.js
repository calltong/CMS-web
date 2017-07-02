import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {manager} from '../utility/Manager';
import {actions} from './Action';

export class EcommerceAction {

  updateLazada(id) {
    actions.product.clearMessage();
    let url = `${config.api.url}/ecommerce/lazada/${id}/update`;
    http.put(url, {authorization: true}).done(response => {
      manager.ClosePanel('#Loading');
      if (response.statusCode !== http.StatusOK) {
        actions.product.setMessage(response.body.result);
      }
    });
  }

  updateQuantityLazada(id) {
    actions.product.clearMessage();
    let url = `${config.api.url}/ecommerce/lazada/${id}/quantity`;
    http.put(url, {authorization: true}).done(response => {
      manager.ClosePanel('#Loading');
      console.log('lazada update quantity:', response.body);
      if (response.statusCode !== http.StatusOK) {
        actions.product.setMessage(response.body.result);
      }
    });
  }

  updateImageLazada(id) {
    actions.product.clearMessage();
    let url = `${config.api.url}/ecommerce/lazada/${id}/image`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode !== http.StatusOK) {
        actions.product.setMessage(response.body.result);
      }
    });
  }

  checkOnLazada(id) {
    actions.product.clearMessage();
    let url = `${config.api.url}/ecommerce/lazada/${id}/check`;
    http.get(url).done(response => {
      let found = false;
      if (response.statusCode === http.StatusOK) {
        found = true;
      }
      store.update('PRODUCT_CHECK_LAZADA', {lazada: found});
    });
  }

}

export const action = new EcommerceAction();