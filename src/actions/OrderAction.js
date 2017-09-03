import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';
import {browserHistory} from 'react-router';

export class OrderAction {
  resetItem() {
    store.update('ORDER_RESET_ITEM');
  }

  getList() {
    let url = `${config.api.url}/order`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body.data;
        store.update('ORDER_STORE_LIST', {list});
      }
    });
  }

  setItem(data) {
    store.update('ORDER_STORE_ITEM', {data: data});
  }

  getItem(id) {
    let url = `${config.api.url}/order/${id}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        this.setItem(data);
      }
    });
  }

  saveItem() {
    let data = store.getState().order.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/order/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          browserHistory.push('/order');
        }
      });
    } else {
      let url = `${config.api.url}/order/create`;
      http.post(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusCreated) {
          browserHistory.push('/order');
        }
      });
    }
  }

}

export const action = new OrderAction();
