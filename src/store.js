import {Store} from './redux-manager';

import {reducer as product} from './stores/Product';
import {reducer as stock} from './stores/Stock';
import {reducer as size} from './stores/Size';
import {reducer as type} from './stores/Type';
import {reducer as color} from './stores/Color';
import {reducer as order} from './stores/Order';
import {reducer as user} from './stores/User';
import {reducer as dialog} from './stores/Dialog';

import {reducer as home} from './stores/page/Home';
import {reducer as menu} from './stores/page/Menu';
import {reducer as aboutus} from './stores/page/Aboutus';
import {reducer as howBuy} from './stores/page/HowBuy';
import {reducer as orderCondition} from './stores/page/OrderCondition';
import {reducer as productInfo} from './stores/page/Product';
import {reducer as payment} from './stores/page/Payment';
import {reducer as page} from './stores/Page';

export const store = new Store({
  product: product.combine(),
  stock: stock.combine(),
  size: size.combine(),
  type: type.combine(),
  color: color.combine(),
  order: order.combine(),
  user: user.combine(),
  page: page.combine(),
  menu: menu.combine(),
  home: home.combine(),
  about_us: aboutus.combine(),
  payment: payment.combine(),
  how_buy: howBuy.combine(),
  product_info: productInfo.combine(),
  order_condition: orderCondition.combine(),
  dialog: dialog.combine(),
});
