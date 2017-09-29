import _ from 'lodash';
import {Reducer} from '../redux-manager';

export const reducer = new Reducer({
  data: {
    _id: '',
    variant_list: [],
  },
  index: 0,
});

reducer.register('STOCK_REFRESH', (state, action) => {
  return state;
});

reducer.register('STOCK_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  return state;
});

reducer.register('STOCK_SET_VARIANT', (state, action) => {
  let {index, data} = action.params;
  state.data.variant_list[index] = data;
  return state;
});

reducer.register('STOCK_ADD_VARIANT', (state, action) => {
  let {data} = action.params;
  state.data.variant_list.push(data);
  state.index = state.data.variant_list.length - 1;
  return state;
});

reducer.register('STOCK_SET_IMAGE', (state, action) => {
  let {list} = action.params;
  state.data.image_list = list;

  return state;
});

reducer.register('STOCK_SET_SQIMAGE', (state, action) => {
  let {list} = action.params;
  state.data.image_sq_list = list;

  return state;
});

reducer.register('STOCK_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('STOCK_VARIANT_INDEX', (state, action) => {
  let {index} = action.params;
  state.index = index;
  return state;
});
