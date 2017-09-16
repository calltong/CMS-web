import _ from 'lodash';
import {Reducer} from '../redux-manager';

export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 10,
  },
  list: [],
  data: {
    _id: undefined,
    tracking_code: '',
    product_list: [],
    status_list: [],
    shipping: {
      location: '',
      name: '',
      mobile: '',
      email: '',
      postcode: '',
      city: '',
    },
    summary: {
      total: 0,
    },
  },
  condition: {
    status: 'working',
    code: '',
  },
});

reducer.register('ORDER_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('ORDER_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  return state;
});

reducer.register('ORDER_STORE_LIST', (state, action) => {
  let {data} = action.params;
  if (data === undefined || data === null) {
    state.list = [];
  } else {
    state.list = data;
  }

  return state;
});

reducer.register('ORDER_STORE_ITEM', (state, action) => {
  let {data} = action.params;

  state.data = data;
  return state;
});

reducer.register('ORDER_STORE_CONDITION', (state, action) => {
  let {data} = action.params;

  state.condition = data;
  return state;
});
