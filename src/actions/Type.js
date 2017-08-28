import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {browserHistory} from 'react-router';

export class Type {
  resetItem() {
    store.update('TYPE_RESET_ITEM');
  }

  getList() {
    let url = `${config.api.url}/protype`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body;
        store.update('TYPE_STORE_LIST', {list});
      }
    });
  }

  setItem(data) {
    if (!data.ecommerce) {
      data.ecommerce = {
        lazada: {
          category_id: 0,
          model: '',
        },
      };
    }
    store.update('TYPE_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/protype/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    let type = store.getState().type;
    let data = type.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/protype/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          browserHistory.push('/TypeManager');
        }
      });
    } else {
      let url = `${config.api.url}/protype/create`;
      http.post(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusCreated) {
          browserHistory.push('/TypeManager');
        }
      });
    }
  }

  remove(id) {
    let url = `${config.api.url}/protype/${id}/delete`;
    http.delete(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        this.getList();
      }
    });
  }
}

export const action = new Type();
