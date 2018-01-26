//import _ from 'lodash';

import {Reducer} from '../redux-manager';

export const reducer = new Reducer({
  manage: {
    current: '/',
  },
  data: {
    name: '',
  },
  message: '',
});

reducer.register('USER_RESET', (state, action) => {
  state = reducer.initial;
  return state;
});

reducer.register('USER_MANAGE', (state, action) => {
  let {data} = action.params;
  state.manage = data;

  return state;
});

reducer.register('USER_DATA', (state, action) => {
  let {data} = action.params;
  state.data = data;
  return state;
});

reducer.register('USER_MESSAGE', (state, action) => {
  let {data} = action.params;
  state.message = data;
  return state;
});
