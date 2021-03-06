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
  data_list: [],
  message: {
    type: '',
    text: '',
  },
  data: {
    _id: '',
    type_id: 0,
    content: {
      main: {
        name: '',
        description: '',
        condition: '',
        package_content: '',
      },
      english: {
        name: '',
        description: '',
        condition: '',
        package_content: '',
      },
    },
    price: 990,
    sale_price:690,
    image: '',
    status: '',
    video: '',
    last_update: 0,
    tag_list: [],
    variant_list: [],
  },
  variant: {
    index: 0,
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
  console.log('test:', reducer.initial.data);
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
  state.data_list = list? list: [];

  return state;
});

reducer.register('PRODUCT_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
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

reducer.register('PRODUCT_SET_TYPE', (state, action) => {
  let {id} = action.params;
  state.page.condition.type_id = id;

  return state;
});

reducer.register('PRODUCT_SET_VARIANT', (state, action) => {
  let {index, data} = action.params;
  state.data.variant_list[index] = data;
  return state;
});

reducer.register('PRODUCT_SET_IMAGE', (state, action) => {
  let {list} = action.params;
  state.data.image_list = list;

  return state;
});

reducer.register('PRODUCT_SET_SQIMAGE', (state, action) => {
  let {list} = action.params;
  state.data.image_sq_list = list;

  return state;
});

reducer.register('PRODUCT_VARIANT_INDEX', (state, action) => {
  let {index} = action.params;
  state.variant.index = index;
  return state;
});
