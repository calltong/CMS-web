import _ from 'lodash';
import {Reducer} from '../../redux-manager';

let page_data = {
  _id: undefined,
  page: '',
  name: '',
  status: '',
  data: {
    content_list: [],
  },
};

export const reducer = new Reducer({
  data: _.cloneDeep(page_data),
  manage: {
    index: undefined,
    level_2: undefined,
  },
});

reducer.register('HOME_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('HOME_SET_DATA', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('HOME_SET_SELECTED', (state, action) => {
  let {data} = action.params;
  state.manage = data;
  return state;
});

reducer.register('HOME_SET_CONTENT', (state, action) => {
  let {data} = action.params;
  state.data.content_list = data;
  return state;
});

reducer.register('HOME_SET_CONTENT_ITEM', (state, action) => {
  let {index, data} = action.params;
  state.data.content_list[index] = data;
  return state;
});
