import _ from 'lodash';
import {Reducer} from '../../redux-manager';

let page_data = {
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
  css: {
    font: '',
    size: 12,
    color: '#ffffff',
    bg_color: '#ffffff',
  },
  menu: {
    brand: {
      type: 'text',
      name: '',
      css: {
        font: '',
        size: 12,
        color: '#ffffff',
      },
    },
    css: {
      font: '',
      size: 12,
      color: '#ffffff',
      bg_color: '#ffffff',
    },
    list: [],
  },
  social_list: [],
  content_list: [],
};

export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 10,
  },
  data_list: [],
  data: _.cloneDeep(page_data),
  content: {
    type: '',
    data: {},
  },
  message: {
    type: '',
    text: '',
  },
  form: {
    menu: {
      display: 'block',
    },
    property: {
      display: 'block',
    },
  },
  page_menu: {
    x: 0,
    y: 0,
    selected: undefined,
    sub_selected: undefined,
    menu: [
      {
        name: 'Menu',
      },
      {
        name: 'Home',
      },
      {
        name: 'Product List',
      },
      {
        name: 'Product Information',
      },
      {
        name: 'Checkout',
      },
      {
        name: 'Contact us',
      },
      {
        name: 'Thank you',
      },
      {
        name: 'Footer',
      },
    ],
  },
});

reducer.register('PAGE_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('PAGE_STORE_LIST', (state, action) => {
  let {list} = action.params;
  state.data_list = list;
  return state;
});

reducer.register('PAGE_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('PAGE_STORE_MESSAGE', (state, action) => {
  let {type, text} = action.params;
  state.message = {
    type: type,
    text: text,
  };
  return state;
});

reducer.register('PAGE_MENU', (state, action) => {
  let {data} = action.params;
  state.page_menu = data;
  return state;
});

reducer.register('PAGE_SET_FORM', (state, action) => {
  let {data} = action.params;
  state.form = data;
  return state;
});

reducer.register('PAGE_SET_FORM_COLOR', (state, action) => {
  let {data} = action.params;
  state.form.color = data;
  return state;
});

/*
reducer.register('PAGE_GEN_PAGE', (state, action) => {
  let {id} = action.params;
  let url = `${config.api.url}/${prefix}/${id}/gencontent`;
  http.put(url, {authorization: true}).done(response => {
    if (response.statusCode === http.StatusOK) {

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
*/
