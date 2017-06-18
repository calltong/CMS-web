import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {browserHistory} from 'react-router';

export class SizeAction {
  resetItem() {
    store.update('SIZE_RESET_ITEM');
  }

  getList() {
    let url = `${config.api.url}/prosize`;
    http.get(url).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body;
        store.update('SIZE_STORE_LIST', {list});
      }
    });
  }

  setItem(data) {
    if (!data.ecommerce) {
      data.ecommerce = {
        lazada: {
          code: '',
        },
      };
    }
    store.update('SIZE_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/prosize/${id}`;
    http.get(url).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    let type = store.getState().size;
    let data = type.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/prosize/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          browserHistory.push('/SizeManager');
        }
      });
    } else {
      let url = `${config.api.url}/prosize/create`;
      http.post(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusCreated) {
          browserHistory.push('/SizeManager');
        }
      });
    }
  }

  remove(id) {
    let url = `${config.api.url}/prosize/${id}/delete`;
    http.delete(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        this.getList();
      }
    });
  }
}

export const action = new SizeAction();
