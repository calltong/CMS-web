import {store} from '../../store';

export class OrderCondition {
  setMain(data) {
    store.update('ORDER_CONDITION_DATA', {data: data});
  }

  selectMenu(index) {
    let manage = store.getState().order_condition.manage;
    manage.index = index;
    store.update('ORDER_CONDITION_SELECTED', {data: manage});
  }

  addItem() {
    let doc = store.getState().order_condition.doc;
    let item = {
      title: '',
    };
    doc.data.list.push(item);
    store.update('ORDER_CONDITION_DATA', {data: doc});
  }

  upItem(index) {
    if (index > 0) {
      let doc = store.getState().order_condition.doc;
      let upItem = doc.data.list[index];
      let downItem = doc.data.list[index - 1];

      doc.data.list[index - 1] = upItem;
      doc.data.list[index] = downItem;
      store.update('ORDER_CONDITION_DATA', {data: doc});

      this.selectMenu(index - 1);
    }
  }

  removeItem(index) {
    let doc = store.getState().order_condition.doc;
    doc.data.list.splice(index, 1);
    store.update('ORDER_CONDITION_DATA', {data: doc});

    this.selectMenu(undefined);
  }

  setItem(index, item) {
    let doc = store.getState().order_condition.doc;
    doc.data.list[index] = item;
    store.update('ORDER_CONDITION_DATA', {data: doc});
  }
}

export const action = new OrderCondition();
