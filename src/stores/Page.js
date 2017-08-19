//import _ from 'lodash';
import {Reducer} from '../redux-manager';

export const reducer = new Reducer({
  message: {
    type: '',
    text: '',
  },
  form: {
    menu: {
      display: 'block',
    },
    property: {
      display: 'block',
    },
  },
  dialog: {
    product: undefined,
  },
  manage: {
    selected: {
      main: undefined,
      level_2: undefined,
      level_3: undefined,
    },
    menu: [
      {
        name: 'Menu',
        title: 'เมนูด้านบน',
      },
      {
        name: 'Footer',
        title: 'เมนูด้านล่าง',
      },
      {
        name: 'Home',
        title: 'หน้าหลัก',
      },
      {
        name: 'Product',
        title: 'รายละเอียดสินค้า',
      },
      {
        name: 'Payment',
        title: 'ชำระเงิน',
      },
      {
        name: 'AboutUs',
        title: 'เกี่ยวกับร้าน',
      },
      {
        name: 'HowToBuy',
        title: 'วิธีการสั่งซื้อ',
      },
      {
        name: 'OrderCondition',
        title: 'เงื่อนไขการสั่งซื้อ',
      },
    ],
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
  return state;
});

reducer.register('PAGE_STORE_MESSAGE', (state, action) => {
  let {type, text} = action.params;
  state.message = {
    type: type,
    text: text,
  };
  return state;
});

reducer.register('PAGE_MENU_SELECTED', (state, action) => {
  let {data} = action.params;
  state.manage.selected = data;
  return state;
});

reducer.register('PAGE_SET_FORM', (state, action) => {
  let {data} = action.params;
  state.form = data;
  return state;
});
