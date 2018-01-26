import {store} from '../../store';
import {config} from '../../config';
import {http} from '../../utility/http';

export class Payment {
  save() {
    let doc = store.getState().payment.doc;
    let id = doc._id;
    if (id !== '' && id !== undefined) {
      let url = `${config.api.url}/page/${id}/edit`;
      http.put(url, {json: doc, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {

        }
      });
    }
  }

  setMain(data) {
    store.update('PAYMENT_DATA', {data: data});
  }

  setData(data) {
    store.update('PAYMENT_DATA_ITEM', {data: data});
  }

  selectMenu(index) {
    let manage = store.getState().payment.manage;
    manage.index = index;
    store.update('PAYMENT_SELECTED', {data: manage});
  }

  selectSubMenu(index) {
    let manage = store.getState().payment.manage;
    manage.level_2 = index;
    store.update('PAYMENT_SELECTED', {data: manage});
  }

  resetSelectMenu() {
    let manage = store.getState().payment.manage;
    let isReset = false;
    if (manage.index !== undefined || manage.level_2 !== undefined) {
      manage.index = undefined;
      manage.level_2 = undefined;
      isReset = true;
    }

    store.update('PAYMENT_SELECTED', {data: manage});
    return isReset;
  }

  addItem() {
    let doc = store.getState().payment.doc;
    let item = {
      url: '',
      bank: 'scb',
      name: '',
      number: '',
    };
    doc.data.list.push(item);
    store.update('PAYMENT_DATA', {data: doc});
  }

  removeItem(index) {
    let doc = store.getState().payment.doc;
    doc.data.list.splice(index, 1);
    store.update('PAYMENT_DATA', {data: doc});

    this.selectMenu(undefined);
  }

  setItem(index, item) {
    let doc = store.getState().payment.doc;
    doc.data.list[index] = item;
    store.update('PAYMENT_DATA', {data: doc});
  }

  upItem(index) {
    if (index > 0) {
      let doc = store.getState().payment.doc;
      let upItem = doc.data.list[index];
      let downItem = doc.data.list[index - 1];

      doc.data.list[index - 1] = upItem;
      doc.data.list[index] = downItem;
      store.update('PAYMENT_DATA', {data: doc});

      this.selectMenu(index - 1);
    }
  }
}

export const action = new Payment();
