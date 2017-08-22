import {store} from '../../store';
//import {actions} from '../Action';

export class Home {
  setMain(data) {
    store.update('HOME_SET_DATA', {data: data});
  }

  selectMenu(index) {
    let manage = store.getState().home.manage;
    manage.index = index;
    store.update('HOME_SET_SELECTED', {data: manage});
  }

  selectSubMenu(index) {
    let manage = store.getState().home.manage;
    manage.level_2 = index;
    store.update('HOME_SET_SELECTED', {data: manage});
  }

  resetSelectMenu() {
    let manage = store.getState().home.manage;
    let isReset = false;
    if (manage.index !== undefined || manage.level_2 !== undefined) {
      manage.index = undefined;
      manage.level_2 = undefined;
      isReset = true;
    }

    store.update('HOME_SET_SELECTED', {data: manage});
    return isReset;
  }

  addContent(content) {
    let doc = store.getState().home.data;
    doc.data.content_list.push(content);
    store.update('HOME_SET_CONTENT', {data: doc.data.content_list});
  }

  upContent(index) {
    if (index > 0) {
      let doc = store.getState().home.data;
      let list = doc.data.content_list;
      let upItem = list[index];
      let downItem = list[index - 1];

      list[index - 1] = upItem;
      list[index] = downItem;
      store.update('HOME_SET_CONTENT', {data: list});

      //this.selectMenu(index - 1);
    }
  }

  removeContent(index) {
    let doc = store.getState().home.data;
    let list = doc.data.content_list;
    list.splice(index, 1);
    store.update('HOME_SET_CONTENT', {data: list});

    //this.selectMenu(undefined);
  }

  setContent(index, item) {
    let doc = store.getState().home.data;
    let list = doc.data.content_list;
    list[index] = item;
    store.update('HOME_SET_CONTENT', {data: list});
  }

  addItem(item) {
    let home = store.getState().home;
    let index = home.manage.index;
    let doc = home.data;
    let content = doc.data.content_list[index];
    content.data.list.push(item);

    store.update('HOME_SET_CONTENT_ITEM', {index, data: content});
  }

  removeItem(indexItem) {
    let home = store.getState().home;
    let index = home.manage.index;
    let doc = home.data;
    let content = doc.data.content_list[index];
    content.data.list.splice(indexItem, 1);
    store.update('HOME_SET_CONTENT_ITEM', {index, data: content});

    this.selectSubMenu(undefined);
  }

  setItem(indexItem, item) {
    let home = store.getState().home;
    let index = home.manage.index;
    let doc = home.data;
    let content = doc.data.content_list[index];
    content.data.list[indexItem] = item;
    store.update('HOME_SET_CONTENT_ITEM', {index, data: content});
  }

  upItem(indexItem) {
    if (indexItem > 0) {
      let home = store.getState().home;
      let index = home.manage.index;
      let doc = home.data;
      let content = doc.data.content_list[index];

      let upItem = content.data.list[indexItem];
      let downItem = content.data.list[indexItem - 1];

      content.data.list[indexItem - 1] = upItem;
      content.data.list[indexItem] = downItem;
      store.update('HOME_SET_CONTENT_ITEM', {index, data: content});
      this.selectSubMenu(indexItem - 1);
    }
  }
}

export const action = new Home();
