import {browserHistory} from 'react-router';
import _ from 'lodash';

import {config} from './../../config';
import {store} from './../../store';
import {http} from './../../utility/http';

import {Reducer} from '../../redux-manager';

const prefix = 'prosize';
export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 10,
  },
  data_list: [],
  data: {
      _id: undefined,
      code: '',
      name: '',
      tag_list: [],
  },
});

reducer.register('SIZE_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('SIZE_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  return state;
});

reducer.register('SIZE_GET_LIST', (state, action) => {
  let {index} = action.params;
  let url = `${config.api.url}/${prefix}?index=${index}`;
  http.get(url).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data_list = response.body;
      store.update('SIZE_STORE_LIST', {data_list});
    }
  });

  return state;
});

reducer.register('SIZE_STORE_LIST', (state, action) => {
  let {data_list} = action.params;
  state.data_list = data_list?data_list:[];
  return state;
});

reducer.register('SIZE_SAVE_ITEM', (state, action) => {
  let data = state.data;
  let json = data;
  let id = data._id;

  if (id) {
    let url = `${config.api.url}/${prefix}/${id}/edit`;
    http.put(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        browserHistory.push(`/SizeManager`);
      }
    });
  } else {
    let url = `${config.api.url}/${prefix}/create`;
    http.post(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusCreated) {
        browserHistory.push(`/SizeManager`);
      }
    });
  }

  return state;
});

reducer.register('SIZE_REMOVE_ITEM', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/${prefix}/${id}/delete`;
  http.delete(url, {authorization: true}).done(response => {
    store.update('SIZE_GET_LIST', {index: 1});
  });

  return state;
});

reducer.register('SIZE_GET_ITEM', (state, action) => {
  let {id} = action.params;

  let url = `${config.api.url}/${prefix}/${id}`;
  http.get(url).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      store.update('SIZE_STORE_ITEM', {data});
    }
  });

  return state;
});

reducer.register('SIZE_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});
