import _ from 'lodash';
import {Reducer} from '../../redux-manager';

let page_data = {
  _id: undefined,
  page: '',
  name: '',
  status: '',
  data: {
    title: '',
    description: '',
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

reducer.register('ABOUT_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('ABOUT_DATA', (state, action) => {
  let {data} = action.params;
  state.doc = data;
  return state;
});

reducer.register('ABOUT_DATA_ITEM', (state, action) => {
  let {data} = action.params;
  state.doc.data = data;
  return state;
});

reducer.register('ABOUT_SELECTED', (state, action) => {
  let {data} = action.params;
  state.manage = data;
  return state;
});
