import _ from 'lodash';
import {Reducer} from '../redux-manager';

export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 20,
    condition: {
      type_id: 0,
      size_id: 0,
    },
  },
  size: {
    index: 0,
    total: 1,
    limit: 10,
  },
  data_list: [],
  type_list: [],
  size_list: [],
  message: {
    type: '',
    text: '',
  },
  data: {
    _id: '',
    name: '',
    type_id: 0,
    information: {
      package_content: '',
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
    image_square_list: [],
    color_list: [],
    tag_list: [],
    stock_list: [],
    connected_list: [],
    lang_eng: {
      name: '',
      information: {
        package_content: '',
        value: '',
        list: [],
      },
    },
  },
  ecommerce: {
    lazada: false,
    street: false,
  },
});

reducer.register('PRODUCT_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('PRODUCT_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  state.ecommerce = _.cloneDeep(reducer.initial.ecommerce);
  state.message = _.cloneDeep(reducer.initial.message);
  return state;
});

reducer.register('PRODUCT_STORE_PAGE', (state, action) => {
  let {data} = action.params;
  state.page = data;
  return state;
});

reducer.register('PRODUCT_STORE_LIST', (state, action) => {
  let {list} = action.params;
  state.data_list = list?list:[];

  return state;
});

reducer.register('PRODUCT_SET_IMAGE', (state, action) => {
  let {list} = action.params;
  state.data.image_list = list;

  return state;
});

reducer.register('PRODUCT_SET_SQIMAGE', (state, action) => {
  let {list} = action.params;
  state.data.image_square_list = list;

  return state;
});

reducer.register('PRODUCT_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('PRODUCT_STORE_TYPE', (state, action) => {
  let {list} = action.params;
  state.type_list = list?list:[];
  return state;
});

reducer.register('PRODUCT_STORE_SIZE', (state, action) => {
  let {list} = action.params;
  state.size_list = list?list:[];
  state.size.total = state.size_list.length;
  return state;
});

reducer.register('PRODUCT_REFRESH', (state, action) => {
  return state;
});

reducer.register('PRODUCT_CHECK_LAZADA', (state, action) => {
  let {lazada, street} = action.params;
  if (lazada) {
    state.ecommerce.lazada = lazada;
  }

  if (street) {
    state.ecommerce.street = street;
  }

  return state;
});

reducer.register('PRODUCT_SET_SIZE', (state, action) => {
  let {index} = action.params;
  state.size.index = index;

  return state;
});

reducer.register('PRODUCT_SET_TYPE', (state, action) => {
  let {id} = action.params;
  state.page.condition.type_id = id;

  return state;
});
