import {store} from '../store';

export class FooterPage {
  setMain(val) {
    let data = store.getState().page.data;
    data.footer = val;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  addItem() {
    let data = store.getState().page.data;
    let item = {
      name: 'ชื่อเมนู',
      type: 'category',
      value: '',
    };
    data.footer.list.push(item);
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  upItem(index) {
    if (index > 0) {
      let data = store.getState().page.data;
      let upItem = data.footer.list[index];
      let downItem = data.footer.list[index - 1];

      data.footer.list[index - 1] = upItem;
      data.footer.list[index] = downItem;
      store.update('PAGE_STORE_ITEM', {data: data});
    }
  }

  removeItem(index) {
    let page = store.getState().page;
    let data = page.data;
    data.footer.list.splice(index, 1);
    store.update('PAGE_STORE_ITEM', {data: data});

    let selected = page.page_menu.selected;
    selected.level_2 = undefined;
    store.update('PAGE_MENU_SELECTED', {data: selected});
  }

  setItem(index, item) {
    let data = store.getState().page.data;
    data.footer.list[index] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  addSubItem(index, item) {
    let data = store.getState().page.data;
    data.footer.list[index].data.items.push(item);
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  setSubItem(index, itemIndex, item) {
    let data = store.getState().page.data;
    data.footer.list[index].data.items[itemIndex] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }
}

export const action = new FooterPage();
