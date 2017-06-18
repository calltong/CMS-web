//import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

export class EcommerceAction {
  createLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/create`;
    http.post(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        console.log('lazada create:', data);
      }
    });
  }

  updateLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/update`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        console.log('lazada update:', data);
      }
    });
  }

  updateQuantityLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/quantity`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        console.log('lazada update quantity:', data);
      }
    });
  }

  updateImageLazada(id) {
    let url = `${config.api.url}/ecommerce/lazada/${id}/image`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        console.log('lazada update image:', data);
      }
    });
  }

}

export const action = new EcommerceAction();
