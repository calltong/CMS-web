import {store} from '../../store';
import {config} from '../../config';
import {http} from '../../utility/http';

export class HowBuy {
  save() {
    let doc = store.getState().how_buy.doc;
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
    store.update('HOW_BUY_DATA', {data: data});
  }

  selectMenu(index) {
    let manage = store.getState().how_buy.manage;
    manage.index = index;
    store.update('HOW_BUY_SELECTED', {data: manage});
  }

  addItem() {
    let doc = store.getState().how_buy.doc;
    let item = {
      title: '',
    };
    doc.data.list.push(item);
    store.update('HOW_BUY_DATA', {data: doc});
  }

  upItem(index) {
    if (index > 0) {
      let doc = store.getState().how_buy.doc;
      let upItem = doc.data.list[index];
      let downItem = doc.data.list[index - 1];

      doc.data.list[index - 1] = upItem;
      doc.data.list[index] = downItem;
      store.update('HOW_BUY_DATA', {data: doc});

      this.selectMenu(index - 1);
    }
  }

  removeItem(index) {
    let doc = store.getState().how_buy.doc;
    doc.data.list.splice(index, 1);
    store.update('HOW_BUY_DATA', {data: doc});

    this.selectMenu(undefined);
  }

  setItem(index, item) {
    let doc = store.getState().how_buy.doc;
    doc.data.list[index] = item;
    store.update('HOW_BUY_DATA', {data: doc});
  }
}

export const action = new HowBuy();
