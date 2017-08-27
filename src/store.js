import {Store} from './redux-manager';

import {reducer as product} from './stores/Product';
import {reducer as size} from './pages/size/reducer';
import {reducer as type} from './pages/type/reducer';
import {reducer as color} from './pages/color/reducer';
import {reducer as order} from './pages/order/reducer';
import {reducer as home} from './stores/page/Home';
import {reducer as menu} from './stores/page/Menu';
import {reducer as aboutus} from './stores/page/Aboutus';
import {reducer as howBuy} from './stores/page/HowBuy';
import {reducer as orderCondition} from './stores/page/OrderCondition';
import {reducer as productInfo} from './stores/page/Product';
import {reducer as payment} from './stores/page/Payment';
import {reducer as page} from './stores/Page';
import {reducer as dialog} from './pages/dialog/reducer';

export const store = new Store({
  product: product.combine(),
  size: size.combine(),
  type: type.combine(),
  color: color.combine(),
  order: order.combine(),
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
