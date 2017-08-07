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

  setMessage(type, text) {
    store.update('PAGE_STORE_MESSAGE', {type: type, text: text});
  }

  backMenu() {
    let data = store.getState().page.page_menu.selected;
    if (data.main === 'Home' || data.main === 'Footer') {
      if (data.level_3 !== undefined) {
        data.level_2 = undefined;
        data.level_3 = undefined;
      } else if (data.level_2 !== undefined) {
        data.level_2 = undefined;
      } else {
        data.main = undefined;
        data.level_2 = undefined;
        data.level_3 = undefined;
      }
    } else {
      data.main = undefined;
      data.level_2 = undefined;
      data.level_3 = undefined;
    }

    store.update('PAGE_MENU_SELECTED', {data});
  }

  selectMenu(index) {
    let data = store.getState().page.page_menu.selected;
    data.main = index;
    data.level_2 = undefined;
    data.level_3 = undefined;
    store.update('PAGE_MENU_SELECTED', {data});
    switch (index) {
      case 'Menu':
        document.getElementById('page').scrollIntoView();
        break;
      case 'Footer':
        document.getElementById('footer').scrollIntoView();
        break;
      default:
        break;
    }
  }

  selectMenuLevel2(index) {
    let data = store.getState().page.page_menu.selected;
    data.level_2 = index;
    data.level_3 = undefined;
    store.update('PAGE_MENU_SELECTED', {data});
  }

  selectMenuLevel3(index) {
    let data = store.getState().page.page_menu.selected;
    data.level_3 = index;
    store.update('PAGE_MENU_SELECTED', {data});
  }
}

export const action = new PageAction();
