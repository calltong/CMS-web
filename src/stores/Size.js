import _ from 'lodash';
import {Reducer} from '../redux-manager';

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
  select_list: [],
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
  list = list !== undefined ? list : [];
  let select = list.map(item => {
    return {value: item._id, label: item.content.main.name, clearableValue: false};
  });
  state.data_list = list;
  state.select_list = select;
  return state;
});

reducer.register('SIZE_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});
