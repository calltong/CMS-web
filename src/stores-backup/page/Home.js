import _ from 'lodash';
import {Reducer} from '../../redux-manager';

let page_data = {
  _id: undefined,
  page: '',
  name: '',
  status: '',
  data: {
    list: [],
  },
};

export const reducer = new Reducer({
  doc: _.cloneDeep(page_data),
  manage: {
    index: undefined,
    level_2: undefined,
  },
});

reducer.register('HOME_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('HOME_DATA', (state, action) => {
  let {data} = action.params;
  state.doc = data;
  return state;
});

reducer.register('HOME_SELECTED', (state, action) => {
  let {data} = action.params;
  state.manage = data;
  return state;
});

reducer.register('HOME_CONTENT', (state, action) => {
  let {data} = action.params;
  state.doc.data.list = data;
  return state;
});

reducer.register('HOME_CONTENT_ITEM', (state, action) => {
  let {index, data} = action.params;
  state.doc.data.list[index] = data;
  return state;
});
