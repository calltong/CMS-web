import {store} from '../store';
export class DialogAction {
  resetProduct() {
    store.update('DIALOG_RESET_PRODUCT');
  }

  selectProduct(item) {
    store.update('DIALOG_SET_PRODUCT', {data: item});
  }

  setConfirmProduct(data, item) {
    store.update('DIALOG_PRODUCT_CONFIRM', {data, item});
  }

  resetColor() {
    store.update('DIALOG_RESET_COLOR');
  }

  selectColor(item) {
    store.update('DIALOG_SET_COLOR', {data: item});
  }

  setConfirmColor(data, item, verify=[]) {
    store.update('DIALOG_COLOR_CONFIRM', {data, item, verify});
  }
}

export const action = new DialogAction();
