import {store} from '../store';
import {actions} from './Action';

export class AboutusPage {
  setMain(val) {
    let data = store.getState().page.data;
    data.about_us = val;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  addItem() {
    let data = store.getState().page.data;
    let item = {
      title: '',
      description: '',
      preview: '',
    };
    data.about_us.list.push(item);
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  upItem(index) {
    if (index > 0) {
      let page = store.getState().page;
      let data = page.data;
      let upItem = data.about_us.list[index];
      let downItem = data.about_us.list[index - 1];

      data.about_us.list[index - 1] = upItem;
      data.about_us.list[index] = downItem;
      store.update('PAGE_STORE_ITEM', {data: data});

      actions.page.selectMenuLevel2(index - 1);
    }
  }

  removeItem(index) {
    let page = store.getState().page;
    let data = page.data;
    data.about_us.list.splice(index, 1);
    store.update('PAGE_STORE_ITEM', {data: data});

    actions.page.selectMenuLevel2(undefined);
  }

  setItem(index, item) {
    let data = store.getState().page.data;
    data.about_us.list[index] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }
}

export const action = new AboutusPage();
