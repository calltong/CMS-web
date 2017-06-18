import _ from 'lodash';
import {Reducer} from '../../redux-manager';

export const reducer = new Reducer({
  page: {
    index: 1,
    total: 1,
    limit: 10,
  },
  data_list: [],
  data: {
    _id: undefined,
    code: '',
    name: '',
    tag_list: [],
    ecommerce: {
      lazada: {
        code: '',
      },
    },
  },
});

reducer.register('SIZE_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('SIZE_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  return state;
});

reducer.register('SIZE_STORE_LIST', (state, action) => {
  let {list} = action.params;
  state.data_list = list?list:[];
  return state;
});

reducer.register('SIZE_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});
