import {store} from '../store';
import {actions} from './Action';

export class ToBuyPage {
  addItem() {
    let data = store.getState().page.data;
    let item = {
      title: '',
    };
    data.how_to_buy.list.push(item);
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  upItem(index) {
    if (index > 0) {
      let page = store.getState().page;
      let data = page.data;
      let upItem = data.how_to_buy.list[index];
      let downItem = data.how_to_buy.list[index - 1];

      data.how_to_buy.list[index - 1] = upItem;
      data.how_to_buy.list[index] = downItem;
      store.update('PAGE_STORE_ITEM', {data: data});

      actions.page.selectMenuLevel2(index - 1);
    }
  }

  removeItem(index) {
    let page = store.getState().page;
    let data = page.data;
    data.how_to_buy.list.splice(index, 1);
    store.update('PAGE_STORE_ITEM', {data: data});

    actions.page.selectMenuLevel2(undefined);
  }

  setItem(index, item) {
    let data = store.getState().page.data;
    data.how_to_buy.list[index] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }
}

export const action = new ToBuyPage();
