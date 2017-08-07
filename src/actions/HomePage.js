import {store} from '../store';

export class HomePage {
  addContent(content) {
    let data = store.getState().page.data;
    data.content_list.push(content);
    store.update('PAGE_SET_CONTENT', {data: data.content_list});
  }

  upContent(index) {
    if (index > 0) {
      let data = store.getState().page.data;
      let upItem = data.content_list[index];
      let downItem = data.content_list[index - 1];

      data.content_list[index - 1] = upItem;
      data.content_list[index] = downItem;
      store.update('PAGE_SET_CONTENT', {data: data.content_list});
    }
  }

  removeContent(index) {
    let page = store.getState().page;
    let data = page.data;
    data.content_list.splice(index, 1);
    store.update('PAGE_SET_CONTENT', {data: data.content_list});
  }

  setContent(index, item) {
    let data = store.getState().page.data;
    data.content_list[index] = item;
    store.update('PAGE_SET_CONTENT', {data: data.content_list});
  }

  addItem(index, item) {
    let data = store.getState().page.data;
    let content = data.content_list[index];
    content.data.list.push(item);

    store.update('PAGE_SET_CONTENT_ITEM', {index, data: content});
  }

  removeItem(index, indexItem) {
    let data = store.getState().page.data;
    let content = data.content_list[index];
    content.data.list.splice(indexItem, 1);
    store.update('PAGE_SET_CONTENT_ITEM', {index, data: content});
  }

  setItem(index, indexItem, item) {
    let data = store.getState().page.data;
    let content = data.content_list[index];
    content.data.list[indexItem] = item;
    store.update('PAGE_SET_CONTENT_ITEM', {index, data: content});
  }

  upItem(index, indexItem) {
    if (indexItem > 0) {
      let data = store.getState().page.data;
      let content = data.content_list[index];

      let upItem = content.data.list[indexItem];
      let downItem = content.data.list[indexItem - 1];

      content.data.list[indexItem - 1] = upItem;
      content.data.list[indexItem] = downItem;
      store.update('PAGE_SET_CONTENT_ITEM', {index, data: content});
    }
  }

  addL3Item(index, indexL2, item) {
    let data = store.getState().page.data;
    let content = data.content_list[index];
    content.data.list.push(item);

    store.update('PAGE_SET_CONTENT_ITEM', {index, data: content});
  }

  removeL3Item(index, indexL2, IndexL3) {
    let data = store.getState().page.data;
    let content = data.content_list[index];
    content.data.list.splice(indexL2, 1);
    store.update('PAGE_SET_CONTENT_ITEM', {index, data: content});
  }

  setL3Item(index, indexL2, item) {
    let data = store.getState().page.data;
    let content = data.content_list[index];
    content.data.list[indexL2] = item;
    store.update('PAGE_SET_CONTENT_ITEM', {index, data: content});
  }

  selectProduct(product) {
    store.update('PAGE_SET_CONTENT_ITEM', {data: product});
  }
}

export const action = new HomePage();
