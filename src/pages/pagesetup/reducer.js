import {browserHistory} from 'react-router';

import {config} from './../../config';
import {store} from './../../store';
import {http} from './../../utility/http';

import {Reducer} from '../../redux-manager';

const prefix = 'page';
export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 10,
  },
  data_list: [],
  data: {
    _id: undefined,
    name: '',
    status: '',
    updated: '',
    information: {
      company: '',
      detail: '',
      address: '',
      mobile: '',
      email: '',
    },
    menu_list: [],
    social_list: [],
    content_list: [],
  },
  content: {
    type: '',
    data: {},
  },
});

reducer.register('PAGE_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('PAGE_GET_LIST', (state, action) => {
  let url = `${config.api.url}/${prefix}`;
  http.get(url, {authorization: true}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let list = response.body;
      store.update('PAGE_STORE_LIST', {list});
    }
  });

  return state;
});

reducer.register('PAGE_STORE_LIST', (state, action) => {
  let {list} = action.params;
  state.data_list = list;

  return state;
});

reducer.register('PAGE_SAVE_ITEM', (state, action) => {
  let data = state.data;
  let id = data._id;
  console.log('save data:', data);
  if (id) {
    let url = `${config.api.url}/${prefix}/${id}/edit`;
    http.put(url, {json:data, authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        browserHistory.push('/PageManager');
      }
    });
  } else {
    let url = `${config.api.url}/${prefix}/create`;
    http.post(url, {json:data, authorization: true}).done(response => {
      if (response.statusCode === http.StatusCreated) {
        browserHistory.push('/PageManager');
      }
    });
  }

  return state;
});

reducer.register('PAGE_REMOVE_ITEM', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/${prefix}/${id}/delete`;
  http.delete(url, {authorization: true}).done(response => {
    store.update('PAGE_GET_LIST', {index: 1});
  });

  return state;
});

reducer.register('PAGE_GET_ITEM', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/${prefix}/${id}`;
  http.get(url, {authorization: true}).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      store.update('PAGE_STORE_ITEM', {data});
    }
  });

  return state;
});

reducer.register('PAGE_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('PAGE_GEN_PAGE', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/${prefix}/${id}/gencontent`;
  http.put(url, {authorization: true}).done(response => {
    if (response.statusCode === http.StatusOK) {
      //let data = response.body;
    }
  });

  return state;
});

reducer.register('PAGE_ADD_CONTENT', (state, action) => {
  let {data} = action.params;
  state.data.content_list.push(data);
  return state;
});

reducer.register('PAGE_REMOVE_CONTENT', (state, action) => {
  let {index} = action.params;
  state.data.content_list.splice(index, 1);
  return state;
});

reducer.register('PAGE_SET_CONTENT', (state, action) => {
  let {index, data} = action.params;
  state.data.content_list[index] = data;
  return state;
});
