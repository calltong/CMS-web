import {store} from '../../store';
import {config} from '../../config';
import {http} from '../../utility/http';

export class Menu {
  save() {
    let doc = store.getState().menu.doc;
    let id = doc._id;
    if (id !== '' && id !== undefined) {
      let url = `${config.api.url}/page/${id}/edit`;
      http.put(url, {json: doc, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {

        }
      });
    }
  }

  setMain(data) {
    store.update('MENU_DATA', {data: data});
  }

  setData(data) {
    store.update('MENU_TOP', {data: data});
  }

  selectMenu(index) {
    let manage = store.getState().menu.manage;
    manage.index = index;
    store.update('MENU_SELECTED', {data: manage});
  }

  resetSelectMenu() {
    let manage = store.getState().menu.manage;
    manage.index = undefined;
    manage.level_2 = undefined;
    store.update('MENU_SELECTED', {data: manage});

    return false;
  }

  addItem() {
    let doc = store.getState().menu.doc;
    let item = {
      name: 'ชื่อเมนู',
      type: 'category',
      value: '',
    };
    doc.data.menu.list.push(item);
    store.update('MENU_DATA', {data: doc});
  }

  upItem(index) {
    if (index > 0) {
      let doc = store.getState().menu.doc;
      let upItem = doc.data.menu.list[index];
      let downItem = doc.data.menu.list[index - 1];

      doc.data.menu.list[index - 1] = upItem;
      doc.data.menu.list[index] = downItem;
      store.update('MENU_DATA', {data: doc});

      this.selectMenu(index - 1);
    }
  }

  removeItem(index) {
    let doc = store.getState().menu.doc;
    doc.data.menu.list.splice(index, 1);
    store.update('MENU_DATA', {data: doc});

    this.selectMenu(undefined);
  }

  setItem(index, item) {
    let doc = store.getState().menu.doc;
    doc.data.menu.list[index] = item;
    store.update('MENU_DATA', {data: doc});
  }
}

export const action = new Menu();
