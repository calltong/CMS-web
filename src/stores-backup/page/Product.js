import _ from 'lodash';
import {Reducer} from '../../redux-manager';
import blank from '../../image/blank.png';

let css = {
  font: '',
  size: 12,
  color: '#000000',
  bg_color: '#ffffff',
};

let page_data = {
  _id: undefined,
  page: '',
  name: '',
  status: '',
  data: {
    css: _.cloneDeep(css),
    list: [],
  },
};

let img = {
  data: blank,
};

export const reducer = new Reducer({
  doc: _.cloneDeep(page_data),
  data: {
    name: 'ชื่อสินค้า',
    information: {
      value: '',
      package_content: '',
    },
    price: 1090,
    sale_price: 590,
    video: '',
    image_list: [img, img, img, img],
    stock_list: [],
    tag_list: [],
  },
  detail: {
    quantity: 1,
    size: undefined,
  },
  manage: {
    index: undefined,
    level_2: undefined,
  },
});

reducer.register('PRODUCT_INFO_DATA', (state, action) => {
  let {data} = action.params;
  state.doc = data;
  return state;
});

reducer.register('PRODUCT_INFO_DATA_ITEM', (state, action) => {
  let {data} = action.params;
  state.doc.data = data;
  return state;
});

reducer.register('PRODUCT_INFO_SELECTED', (state, action) => {
  let {data} = action.params;
  state.manage = data;
  return state;
});

reducer.register('PRODUCT_INFO_CONTENT', (state, action) => {
  let {data} = action.params;
  state.doc.data.list = data;
  return state;
});

reducer.register('PRODUCT_INFO_CONTENT_ITEM', (state, action) => {
  let {index, data} = action.params;
  state.doc.data.list[index] = data;
  return state;
});
