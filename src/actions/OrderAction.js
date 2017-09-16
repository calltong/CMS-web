import swal from 'sweetalert';

import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

export class OrderAction {
  resetItem() {
    store.update('ORDER_RESET_ITEM');
  }

  getList() {
    let condition = store.getState().order.condition;
    let q = '?page=1';
    if (condition.code) {
      q += `&&code=${condition.code}`;
    }

    if (condition.status) {
      q += `&&status=${condition.status}`;
    }
    let url = `${config.api.url}/order${q}`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let list = response.body;
        store.update('ORDER_STORE_LIST', {data: list});
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
          swal({
            title: '',
            text: 'บันทึกเรียบร้อย',
          });
        }
      });
    }
  }

  setOrderStatus(status) {
    let data = store.getState().order.data;
    let duplicated = data.status_list.find(item => {
      return item.status === status;
    });

    if (duplicated === undefined) {
      data.status = status;
      data.status_list.push({status, updated_at: Date.now()});
      this.setItem(data);
    }

    let url = `${config.api.url}/order/${data._id}/edit`;
    http.put(url, {json: data, authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        swal({
          title: '',
          text: 'บันทึกเรียบร้อย',
        });
      }
    });
  }

  setCondition(val) {
    store.update('ORDER_STORE_CONDITION', {data: val});
  }
}

export const action = new OrderAction();
