import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {manager} from '../utility/Manager';
import {messageBox} from '../utility/MessageBox';
//import {actions} from './Action';

export class EcommerceAction {
  updateLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/update`;
    http.put(url, {authorization: true}).done(response => {
      manager.ClosePanel('#Loading');
      if (response.statusCode === http.StatusOK) {
        messageBox.Display('Completed');
      } else {
        messageBox.Display(response.body.result);
      }
    });
  }

  updateQuantityLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/quantity`;
    http.put(url, {authorization: true}).done(response => {
      manager.ClosePanel('#Loading');
      if (response.statusCode === http.StatusOK) {
        messageBox.Display('Completed');
      } else {
        messageBox.Display(response.body.result);
      }
    });
  }

  updateImageLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/image`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        messageBox.Display('Completed');
      } else {
        messageBox.Display(response.body.result);
      }
    });
  }

  checkOnLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/check`;
    http.get(url, {authorization: true}).done(response => {
      let found = false;
      if (response.statusCode === http.StatusOK) {
        found = true;
      }
      store.update('PRODUCT_CHECK_LAZADA', {lazada: found});
    });
  }

}

export const action = new EcommerceAction();
