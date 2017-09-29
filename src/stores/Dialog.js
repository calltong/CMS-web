import {Reducer} from '../redux-manager';

export const reducer = new Reducer({
  product: {
    value: undefined,
    item: undefined,
    confirm: undefined,
  },
  color: {
    value: undefined,
    item: undefined,
    confirm: undefined,
    verify: [],
  },
});

reducer.register('DIALOG_RESET_PRODUCT', (state, action) => {
  state.product = {
    value: undefined,
    item: undefined,
    confirm: undefined,
  };
  return state;
});

reducer.register('DIALOG_SET_PRODUCT', (state, action) => {
  let {data} = action.params;
  state.product.value = data;
  return state;
});

reducer.register('DIALOG_PRODUCT_CONFIRM', (state, action) => {
  let {data, item} = action.params;
  state.product.confirm = data;
  state.product.item = item;
  return state;
});

reducer.register('DIALOG_RESET_COLOR', (state, action) => {
  state.color = {
    value: undefined,
    item: undefined,
    confirm: undefined,
    verify: [],
  };
  return state;
});

reducer.register('DIALOG_SET_COLOR', (state, action) => {
  let {data} = action.params;
  state.color.value = data;
  return state;
});

reducer.register('DIALOG_COLOR_CONFIRM', (state, action) => {
  let {data, item, verify} = action.params;
  state.color.confirm = data;
  state.color.item = item;
  state.color.verify = verify;
  return state;
});
