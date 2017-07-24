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
        let list = [];
        for (let item of data.menu.list) {
          if (item.type === 'category') {
            item.category = item.value;
            item.tag = '';
          } else {
            item.category = '';
            item.tag = item.value;
          }

          list.push(item);
        }
        data.menu.list = list;
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
      let list = [];
      for (let item of data.menu.list) {
        if (item.type === 'category') {
          item.value = item.category;
        } else {
          item.value = item.tag;
          item.category = '';
          item.tag = item.value;
        }
        item.category = undefined;
        item.tag = undefined;
        list.push(item);
      }

      data.menu.list = list;
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

  addMenuItem() {
    let data = store.getState().page.data;
    let item = {
      name: 'ชื่อเมนู',
      type: 'category',
      value: '',
    };
    data.menu.list.push(item);
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  upMenuItem(index) {
    if (index > 0) {
      let data = store.getState().page.data;
      let upItem = data.menu.list[index];
      let downItem = data.menu.list[index - 1];

      data.menu.list[index - 1] = upItem;
      data.menu.list[index] = downItem;
      store.update('PAGE_STORE_ITEM', {data: data});
    }

  }

  removeMenuItem(index) {
    let page = store.getState().page;
    let data = page.data;
    data.menu.list.splice(index, 1);
    store.update('PAGE_STORE_ITEM', {data: data});

    let page_menu = page.page_menu;
    page_menu.sub_selected = undefined;
    store.update('PAGE_MENU', {data: page_menu});
  }

  setMenuItem(index, item) {
    let data = store.getState().page.data;
    data.menu.list[index] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  setMessage(type, text) {
    store.update('PAGE_STORE_MESSAGE', {type: type, text: text});
  }

  setPageMenu(x, y) {
    store.update('PAGE_MENU', {x, y});
  }

  backPageMenu() {
    let data = store.getState().page.page_menu;
    data.selected = undefined;
    data.sub_selected = undefined;
    store.update('PAGE_MENU', {data});
  }

  selectPageMenu(index) {
    let data = store.getState().page.page_menu;
    data.selected = index;
    data.sub_selected = undefined;
    store.update('PAGE_MENU', {data});
  }

  selectPageSubMenu(index) {
    let data = store.getState().page.page_menu;
    data.sub_selected = index;
    store.update('PAGE_MENU', {data});
  }
}

export const action = new PageAction();
