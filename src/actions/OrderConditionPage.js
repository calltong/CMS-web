import {store} from '../store';
import {actions} from './Action';

export class OrderConditionPage {
  setMain(val) {
    let data = store.getState().page.data;
    data.condition = val;
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  addItem() {
    let data = store.getState().page.data;
    let item = {
      title: '',
    };
    data.condition.list.push(item);
    store.update('PAGE_STORE_ITEM', {data: data});
  }

  upItem(index) {
    if (index > 0) {
      let page = store.getState().page;
      let data = page.data;
      let upItem = data.condition.list[index];
      let downItem = data.condition.list[index - 1];

      data.condition.list[index - 1] = upItem;
      data.condition.list[index] = downItem;
      store.update('PAGE_STORE_ITEM', {data: data});

      actions.page.selectMenuLevel2(index - 1);
    }
  }

  removeItem(index) {
    let page = store.getState().page;
    let data = page.data;
    data.condition.list.splice(index, 1);
    store.update('PAGE_STORE_ITEM', {data: data});

    actions.page.selectMenuLevel2(undefined);
  }

  setItem(index, item) {
    let data = store.getState().page.data;
    data.condition.list[index] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }
}

export const action = new OrderConditionPage();
