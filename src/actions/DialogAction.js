import {store} from '../store';
//import {config} from '../config';
//import {http} from '../utility/http';

export class DialogAction {
  resetPageMenu() {
    store.update('DIALOG_RESET_PRODUCT');
  }

  selectProduct(product) {
    store.update('DIALOG_SET_PRODUCT', {data: product});
  }

  setConfirmProduct(event, item) {
    store.update('DIALOG_SET_CONFIRM', {data: event, item});
  }
}

export const action = new DialogAction();
