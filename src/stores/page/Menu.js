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
  page: '',
  name: '',
  status: '',
  data: {
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
  },
};

export const reducer = new Reducer({
  doc: _.cloneDeep(page_data),
  manage: {
    index: undefined,
    level_2: undefined,
  },
});

reducer.register('MENU_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('MENU_DATA', (state, action) => {
  let {data} = action.params;
  state.doc = data;
  return state;
});

reducer.register('MENU_SELECTED', (state, action) => {
  let {data} = action.params;
  state.manage = data;
  return state;
});

reducer.register('MENU_TOP', (state, action) => {
  let {data} = action.params;
  state.doc.data.menu = data;
  return state;
});

reducer.register('MENU_FOOTER', (state, action) => {
  let {data} = action.params;
  state.doc.data.footer = data;
  return state;
});
