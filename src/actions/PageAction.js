import {store} from '../store';
import {config} from '../config';
import {http} from '../utility/http';

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
    this.setMessage('', '');
    if (id) {
      let url = `${config.api.url}/page/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          this.setMessage('good', 'เสร็จเรียบร้อย');
        } else {
          this.setMessage('error', 'ไม่สามารถบันทึกข้อมูลได้');
        }
      });
    }
  }

  setMenu(menu) {
    let data = store.getState().page.data;
    data.menu = menu;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  setMenuItem(index, menu) {
    let data = store.getState().page.data;
    data.menu.list[index] = menu;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  setMessage(type, text) {
    store.update('PAGE_STORE_MESSAGE', {type: type, text: text});
  }

  setPageMenu(x, y) {
    store.update('PAGE_MENU', {x, y});
  }

  selectPageMenu(index) {
    let data = store.getState().page.page_menu;
    data.selected = index;
    store.update('PAGE_MENU', {data});
  }

}

export const action = new PageAction();
