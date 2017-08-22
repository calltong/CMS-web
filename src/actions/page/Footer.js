import {store} from '../../store';

export class Footer {
  selectMenu(index) {
    let manage = store.getState().menu.manage;
    manage.index = index;
    store.update('MENU_SET_SELECTED', {data: manage});
  }

  selectSubMenu(index) {
    let manage = store.getState().menu.manage;
    manage.level_2 = index;
    store.update('MENU_SET_SELECTED', {data: manage});
  }

  resetSelectMenu() {
    let manage = store.getState().menu.manage;
    let isReset = false;
    if (manage.index || manage.level_2) {
      manage.index = undefined;
      manage.level_2 = undefined;
      isReset = true;
    }

    store.update('MENU_SET_SELECTED', {data: manage});
    return isReset;
  }

  addItem() {
    let doc = store.getState().menu.data;
    let item = {
      name: 'ชื่อเมนู',
      type: 'category',
      value: '',
    };
    doc.data.footer.list.push(item);
    store.update('MENU_SET_DATA', {data: doc});
  }

  upItem(index) {
    if (index > 0) {
      let doc = store.getState().menu.data;
      let upItem = doc.data.footer.list[index];
      let downItem = doc.data.footer.list[index - 1];

      doc.data.footer.list[index - 1] = upItem;
      doc.data.footer.list[index] = downItem;
      store.update('MENU_SET_DATA', {data: doc});

      this.selectMenu(index - 1);
    }
  }

  removeItem(index) {
    let doc = store.getState().menu.data;
    doc.data.footer.list.splice(index, 1);
    store.update('MENU_SET_DATA', {data: doc});

    this.selectMenu(undefined);
  }

  setItem(index, item) {
    let doc = store.getState().menu.data;
    doc.data.footer.list[index] = item;
    store.update('MENU_SET_DATA', {data: doc});
  }

  addSubItem(item) {
    let menu = store.getState().menu;
    let index = menu.manage.index;
    let doc = menu.data;
    doc.data.footer.list[index].data.items.push(item);
    store.update('MENU_SET_DATA', {data: doc});
  }

  upSubItem(itemIndex) {
    if (itemIndex > 0) {
      let menu = store.getState().menu;
      let index = menu.manage.index;
      let doc = menu.data;
      let i = doc.data.footer.list[index];
      let upItem = i.data.items[itemIndex];
      let downItem = i.data.items[itemIndex - 1];

      i.data.items[itemIndex - 1] = upItem;
      i.data.items[itemIndex] = downItem;

      doc.data.footer.list[index] = i;
      store.update('MENU_SET_DATA', {data: doc});

      this.selectSubMenu(itemIndex - 1);
    }
  }

  removeSubItem(itemIndex) {
    if (itemIndex > 0) {
      let menu = store.getState().menu;
      let index = menu.manage.index;
      let doc = menu.data;
      doc.data.footer.list[index].data.items.splice(itemIndex, 1);
      store.update('MENU_SET_DATA', {data: doc});

      this.selectSubMenu(undefined);
    }
  }

  setSubItem(index, itemIndex, item) {
    let doc = store.getState().menu.data;
    console.log('con:', doc.data.footer.list[index]);
    doc.data.footer.list[index].data.items[itemIndex] = item;
    store.update('MENU_SET_DATA', {data: doc});
  }
}

export const action = new Footer();
