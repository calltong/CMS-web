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
    menu_list: [],
    social_list: [],
    content_list: [],
  },
  content: {
    type: '',
    data: {},
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
  console.log('page item');
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
