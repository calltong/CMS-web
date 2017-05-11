import {browserHistory} from 'react-router';
import _ from 'lodash';

import {config} from './../../config';
import {store} from './../../store';
import {http} from './../../utility/http';

import {Reducer} from '../../redux-manager';

const prefix = 'order';
export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 10,
  },
  data_list: [],
  data: {
    id: undefined,
    items: [],
    trackings: [],
    account: {
      email: '',
    },
    recipient: {
      location: '',
      name: '',
      phone: '',
      postcode: '',
      province: '',
    },
  },
  condition: 'Order',
});

reducer.register('ORDER_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('ORDER_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  return state;
});

reducer.register('ORDER_GET_LIST', (state, action) => {
  let {condition} = action.params;
  if (condition && condition !== '') {
    state.condition = condition;
  }

  let url = `${config.api.url}/v1/orders`;
  http.get(url, {authorization: true}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let list = response.body.data;
      store.update('ORDER_STORE_LIST', {list});
    }
  });

  return state;
});

reducer.register('ORDER_STORE_LIST', (state, action) => {
  let {list} = action.params;
  state.data_list = list?list:[];

  return state;
});

reducer.register('ORDER_SAVE_ITEM', (state, action) => {
  let data = state.data;
  let json = data;
  let id = data._id;

  if (id) {
    let url = `${config.api.url}/${prefix}/${id}/edit`;
    http.put(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        browserHistory.push('/orders');
      }
    });
  } else {
    let url = `${config.api.url}/${prefix}/create`;
    http.post(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusCreated) {
        browserHistory.push('/orders');
      }
    });
  }

  return state;
});

reducer.register('ORDER_REMOVE_ITEM', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/${prefix}/${id}/delete`;
  http.delete(url, {authorization: true}).done(response => {
    store.update('ORDER_GET_LIST', {index: 1});
  });

  return state;
});

reducer.register('ORDER_GET_ITEM', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/v1/orders/${id}`;
  http.get(url).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body.data;
      store.update('ORDER_STORE_ITEM', {data});
    }
  });

  return state;
});

reducer.register('ORDER_STORE_ITEM', (state, action) => {
  let {data} = action.params;

  state.data = data;
  return state;
});
