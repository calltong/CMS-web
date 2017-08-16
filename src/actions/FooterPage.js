import {store} from '../store';
import {actions} from './Action';

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
      let page = store.getState().page;
      let data = page.data;
      let upItem = data.footer.list[index];
      let downItem = data.footer.list[index - 1];

      data.footer.list[index - 1] = upItem;
      data.footer.list[index] = downItem;
      store.update('PAGE_STORE_ITEM', {data: data});

      //actions.page.selectMenuLevel2(index - 1);
    }
  }

  removeItem(index) {
    let page = store.getState().page;
    let data = page.data;
    data.footer.list.splice(index, 1);
    store.update('PAGE_STORE_ITEM', {data: data});

    //actions.page.selectMenuLevel2(undefined);
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

  upSubItem(index, itemIndex) {
    if (itemIndex > 0) {
      let page = store.getState().page;
      let data = page.data;
      let i = data.footer.list[index];
      let upItem = i.data.items[itemIndex];
      let downItem = i.data.items[itemIndex - 1];

      i.data.items[itemIndex - 1] = upItem;
      i.data.items[itemIndex] = downItem;

      data.footer.list[index] = i;
      store.update('PAGE_STORE_ITEM', {data: data});

      actions.page.selectMenuLevel3(itemIndex - 1);
    }
  }

  removeSubItem(index, itemIndex) {
    if (itemIndex > 0) {
      let page = store.getState().page;
      let data = page.data;
      console.log('p:', data.footer);
      data.footer.list[index].data.items.splice(itemIndex, 1);
      store.update('PAGE_STORE_ITEM', {data: data});

      actions.page.selectMenuLevel3(undefined);
    }
  }

  setSubItem(index, itemIndex, item) {
    let data = store.getState().page.data;
    data.footer.list[index].data.items[itemIndex] = item;
    store.update('PAGE_STORE_ITEM', {data: data});
  }
}

export const action = new FooterPage();
