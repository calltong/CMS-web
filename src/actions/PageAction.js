import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {browserHistory} from 'react-router';

export class PageAction {
  resetItem() {
    store.update('PAGE_RESET_ITEM');
  }

  getList() {
    let url = `${config.api.url}/page`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body;
        store.update('PAGE_STORE_LIST', {list});
      }
    });
  }

  setItem(data) {
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/page/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    let data = store.getState().page.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/page/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          browserHistory.push('/PageManager');
        }
      });
    } else {
      let url = `${config.api.url}/page/create`;
      http.post(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusCreated) {
          browserHistory.push('/PageManager');
        }
      });
    }
  }

  setMenu(index, menu) {
    let data = store.getState().page.data;
    data.menu_list[index] = menu;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

}

export const action = new PageAction();
