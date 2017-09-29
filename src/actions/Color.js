import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {browserHistory} from 'react-router';

export class Color {
  resetItem() {
    store.update('COLOR_RESET_ITEM');
  }

  getList(check) {
    let len = store.getState().color.data_list.length;
    if (check === undefined || len === 0) {
      let url = `${config.api.url}/color`;
      http.get(url, {authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          let list = response.body;
          store.update('COLOR_STORE_LIST', {list});
        }
      });
    }
  }

  setItem(data) {
    store.update('COLOR_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/color/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    let type = store.getState().color;
    let data = type.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/color/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          browserHistory.push('/color');
        }
      });
    } else {
      let url = `${config.api.url}/color/create`;
      http.post(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusCreated) {
          browserHistory.push('/color');
        }
      });
    }
  }

  remove(id) {
    let url = `${config.api.url}/color/${id}/delete`;
    http.delete(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        this.getList();
      }
    });
  }
}

export const action = new Color();
