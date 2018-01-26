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
    code: '#FFFFFF',
    content: {
      main: {
        name: '',
      },
      english: {
        name: '',
      },
    },
  },
  select_list: [],
});

reducer.register('COLOR_RESET_ITEM', (state, action) => {
  state.data = _.cloneDeep(reducer.initial.data);
  return state;
});

reducer.register('COLOR_STORE_LIST', (state, action) => {
  let {list} = action.params;
  list = list ? list : [];
  let select = list.map(item => {
    return {value: item._id, label: item.content.main.name, clearableValue: false};
  });
  state.data_list = list;
  state.select_list = select;

  return state;
});


reducer.register('COLOR_STORE_ITEM', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});
