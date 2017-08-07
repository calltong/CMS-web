import {store} from '../store';

export class MenuPage {
  setMain(val) {
    let data = store.getState().page.data;
    data.menu = val;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  addItem() {
    let data = store.getState().page.data;
    let item = {
      name: 'ชื่อเมนู',
      type: 'category',
      value: '',
    };
    data.menu.list.push(item);
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  upItem(index) {
    if (index > 0) {
      let data = store.getState().page.data;
      let upItem = data.menu.list[index];
      let downItem = data.menu.list[index - 1];

      data.menu.list[index - 1] = upItem;
      data.menu.list[index] = downItem;
      store.update('PAGE_STORE_ITEM', {data: data});
    }
  }

  removeItem(index) {
    let page = store.getState().page;
    let data = page.data;
    data.menu.list.splice(index, 1);
    store.update('PAGE_STORE_ITEM', {data: data});

    let selected = page.page_menu.selected;
    selected.level_2 = undefined;
    store.update('PAGE_MENU_SELECTED', {data: selected});
  }

  setItem(index, item) {
    let data = store.getState().page.data;
    data.menu.list[index] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }
}

export const action = new MenuPage();
