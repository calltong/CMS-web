import {store} from '../../store';

export class Aboutus {
  setMain(data) {
    store.update('ABOUT_DATA', {data: data});
  }

  setData(data) {
    store.update('ABOUT_DATA_ITEM', {data: data});
  }

  selectMenu(index) {
    let manage = store.getState().about_us.manage;
    manage.index = index;
    store.update('ABOUT_SELECTED', {data: manage});
  }

  addItem() {
    let doc = store.getState().about_us.doc;
    let item = {
      title: '',
      description: '',
      preview: '',
    };
    doc.data.list.push(item);
    store.update('ABOUT_DATA', {data: doc});
  }

  upItem(index) {
    if (index > 0) {
      let doc = store.getState().about_us.doc;
      let upItem = doc.data.list[index];
      let downItem = doc.data.list[index - 1];

      doc.data.list[index - 1] = upItem;
      doc.data.list[index] = downItem;
      store.update('ABOUT_DATA', {data: doc});

      this.selectMenu(index - 1);
    }
  }

  removeItem(index) {
    let doc = store.getState().about_us.doc;
    doc.data.list.splice(index, 1);
    store.update('ABOUT_DATA', {data: doc});

    this.selectMenu(undefined);
  }

  setItem(index, item) {
    let doc = store.getState().about_us.doc;
    doc.data.list[index] = item;
    store.update('ABOUT_DATA', {data: doc});
  }
}

export const action = new Aboutus();
