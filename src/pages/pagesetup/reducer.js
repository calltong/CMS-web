import _ from 'lodash';
import {Reducer} from '../../redux-manager';

let css = {
  font: '',
  size: 12,
  color: '#ffffff',
  bg_color: '#ffffff',
};

let page_data = {
  _id: undefined,
  name: '',
  status: '',
  updated: '',
  css: _.cloneDeep(css),
  menu: {
    brand: {
      type: 'text',
      name: '',
      css: _.cloneDeep(css),
    },
    css: _.cloneDeep(css),
    list: [],
  },
  footer: {
    type: '',
    css: _.cloneDeep(css),
    list: [],
  },
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
  dialog: {
    product: undefined,
  },
  page_menu: {
    selected: {
      main: 'Footer',
      level_2: undefined,
      level_3: undefined,
    },
    menu: [
      {
        name: 'Menu',
        title: 'เมนูด้านบน',
      },
      {
        name: 'Home',
        title: 'หน้าหลัก',
      },
      {
        name: 'Product List',
        title: 'หน้ารายการสินค้า',
      },
      {
        name: 'Product Information',
        title: 'หน้าสินค้า',
      },
      {
        name: 'Checkout',
        title: 'หน้าสั่งสินค้า',
      },
      {
        name: 'Contact us',
        title: 'หน้าติดต่อร้าน',

      },
      {
        name: 'Thank you',
        title: 'หน้าขอบคุณ',
      },
      {
        name: 'Footer',
        title: 'เมนูด้านล่าง',
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

reducer.register('PAGE_MENU_SELECTED', (state, action) => {
  let {data} = action.params;
  state.page_menu.selected = data;
  return state;
});

reducer.register('PAGE_SET_FORM', (state, action) => {
  let {data} = action.params;
  state.form = data;
  return state;
});

reducer.register('PAGE_SET_CONTENT', (state, action) => {
  let {data} = action.params;
  state.data.content_list = data;
  return state;
});

reducer.register('PAGE_SET_CONTENT_ITEM', (state, action) => {
  let {index, data} = action.params;
  state.data.content_list[index] = data;
  return state;
});
