import {Store} from './redux-manager';

import {reducer as product} from './pages/product/reducer';
import {reducer as size} from './pages/size/reducer';
import {reducer as type} from './pages/type/reducer';
import {reducer as color} from './pages/color/reducer';
import {reducer as order} from './pages/order/reducer';
import {reducer as page} from './pages/pagesetup/reducer';
import {reducer as dialog} from './pages/dialog/reducer';

export const store = new Store({
  product: product.combine(),
  size: size.combine(),
  type: type.combine(),
  color: color.combine(),
  order: order.combine(),
  page: page.combine(),
  dialog: dialog.combine(),
});
