import {Reducer} from '../../redux-manager';

export const reducer = new Reducer({
  product: {
    value: undefined,
    item: undefined,
    confirm: undefined,
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

reducer.register('DIALOG_SET_CONFIRM', (state, action) => {
  let {data, item} = action.params;
  state.product.confirm = data;
  state.product.item = item;
  return state;
});
