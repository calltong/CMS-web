import {browserHistory} from 'react-router';
import _ from 'lodash';

import {config} from './../../config';
import {store} from './../../store';
import {http} from './../../utility/http';

import {Reducer} from '../../redux-manager';

const prefix = 'product';
export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 20,
    condition: '',
  },
  size: {
    index: 0,
    total: 1,
    limit: 9,
  },
  data_list: [],
  type_list: [],
  size_list: [],
  data: {
      _id: '',
      name: '',
      type_id: 0,
      information: {
        value: '',
        list: [],
      },
      price: 990,
      sale_price:690,
      image: '',
      status: '',
      video: '',
      last_update: 0,
      image_list: [],
      color_list: [],
      tag_list: [],
      stock_list: [],
      connected_list: [],
      lang_eng: {
        name: '',
        information: {
          value: '',
          list: [],
        },
      }
  },
  image_list:[],
});

reducer.register('PRODUCT_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('PRODUCT_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  return state;
});

reducer.register('PRODUCT_GET_FULL_LIST', (state, action) => {
  let url = `${config.api.url}/${prefix}/get/count`;
  http.get(url).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      store.update('PRODUCT_STORE_COUNT', {data});
      store.update('PRODUCT_GET_LIST', {index:1});
    }
  });

  return state;
});

reducer.register('PRODUCT_GET_LIST', (state, action) => {
  let {index} = action.params;

  if (index) {
    state.page.index = index;
  } else {
    index = state.page.index;
  }

  let limit = state.page.limit;
  let url = `${config.api.url}/${prefix}?page=${index}&&limit=${limit}`;
  http.get(url).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data_list = response.body;
      store.update('PRODUCT_STORE_LIST', {data_list});
    }
  });

  return state;
});

reducer.register('PRODUCT_STORE_COUNT', (state, action) => {
  let {data} = action.params;
  state.page.total = data.value;

  return state;
});

reducer.register('PRODUCT_STORE_LIST', (state, action) => {
  let {data_list} = action.params;
  state.data_list = data_list?data_list:[];

  return state;
});

reducer.register('PRODUCT_SAVE_ITEM', (state, action) => {
  let data = state.data;
  let json = data;
  let id = data._id;

  if (id) {
    let url = `${config.api.url}/${prefix}/${id}/edit`;
    http.put(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        browserHistory.push(`/ProductManager`);
      }
    });
  } else {
    let url = `${config.api.url}/${prefix}/create`;
    http.post(url, {json, authorization: true}).done(response => {
      if (response.statusCode === http.StatusCreated) {
        browserHistory.push(`/ProductManager`);
      }
    });
  }

  return state;
});

reducer.register('PRODUCT_ADD_IMAGE', (state, action) => {
  let {data, width, height} = action.params;
  let image = {
    status: true,
    data: data,
    width: width,
    height: height,
  }
  state.data.image_list.push(image);

  return state;
});

reducer.register('PRODUCT_EDIT_IMAGE', (state, action) => {
  let {index, data, width, height} = action.params;
  let image = {
    status: true,
    data: data,
    width: width,
    height: height,
  }
  state.data.image_list[index] = image;

  return state;
});

reducer.register('PRODUCT_REMOVE_IMAGE', (state, action) => {
  let {index} = action.params;
  let list = state.data.image_list;
  list.splice(index, 1);
  state.data.image_list = list;
  return state;
});

reducer.register('PRODUCT_REMOVE_ITEM', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/${prefix}/${id}/delete`;
  http.delete(url, {authorization: true}).done(response => {
    store.update('PRODUCT_GET_LIST', {index: 1});
  });

  return state;
});

reducer.register('PRODUCT_GET_ITEM', (state, action) => {
  let {id} = action.params;

  let url = `${config.api.url}/${prefix}/${id}`;
  http.get(url).done(response => {
    if (response.statusCode === http.StatusOK) {
      let data = response.body;
      store.update('PRODUCT_STORE_ITEM', {data});
    }
  });

  return state;
});

reducer.register('PRODUCT_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('PRODUCT_GET_TYPE', (state, action) => {
  let {load} = action.params;
  if (state.type_list.length === 0 || load === true) {
    let url = `${config.api.url}/protype`;
    http.get(url).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data_list = response.body;
        store.update('PRODUCT_STORE_TYPE', {data_list});
      }
    });
  }

  return state;
});

reducer.register('PRODUCT_STORE_TYPE', (state, action) => {
  let {data_list} = action.params;
  state.type_list = data_list?data_list:[];
  return state;
});

reducer.register('PRODUCT_GET_SIZE', (state, action) => {
  let {load} = action.params;
  if (state.type_list.length === 0 || load === true) {
    let url = `${config.api.url}/prosize`;
    http.get(url).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data_list = response.body;
        store.update('PRODUCT_STORE_SIZE', {data_list});
      }
    });
  }

  return state;
});

reducer.register('PRODUCT_STORE_SIZE', (state, action) => {
  let {data_list} = action.params;
  state.size_list = data_list?data_list:[];
  state.size.total = state.size_list.length;
  return state;
});

reducer.register('PRODUCT_REFRESH', (state, action) => {
  return state;
});

reducer.register('PRODUCT_ADD_SIZE', (state, action) => {
  let {value} = action.params;
  state.data.stock_list.push({size_id:value, quantity: 0});
  return state;
});

reducer.register('PRODUCT_REMOVE_SIZE', (state, action) => {
  let {index} = action.params;
  let list = state.data.stock_list;
  list.splice(index, 1);
  state.data.stock_list = list;
  return state;
});

reducer.register('PRODUCT_CHANGE_SIZE', (state, action) => {
  let {index, value} = action.params;
  let stock_list = state.data.stock_list;
  stock_list[index].size_id = value;
  state.data.stock_list = stock_list;
  return state;
});

reducer.register('PRODUCT_CHANGE_QUANTITY', (state, action) => {
  let {index, value} = action.params;
  let stock_list = state.data.stock_list;
  let val = parseInt(value, 10);
  stock_list[index].quantity = val? val: 0;
  state.data.stock_list = stock_list;
  return state;
});

reducer.register('PRODUCT_SET_SIZEPAGE', (state, action) => {
  let {index} = action.params;
  state.size.index = index;

  return state;
});
