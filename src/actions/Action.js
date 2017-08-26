import {action as product} from './Product';
import {action as type} from './Type';
import {action as size} from './Size';
import {action as order} from './OrderAction';
import {action as ecommerce} from './EcommerceAction';
import {action as page} from './page/Page';
import {action as menu} from './page/Menu';
import {action as home} from './page/Home';
import {action as footer} from './page/Footer';
import {action as aboutus} from './page/Aboutus';
import {action as orderCondition} from './page/OrderCondition';
import {action as toBuy} from './page/HowBuy';
import {action as productInfo} from './page/Product';
import {action as dialog} from './DialogAction';

export const actions = {
  product,
  type,
  size,
  order,
  ecommerce,
  dialog,
  page: {
    main: page,
    menu: menu,
    footer: footer,
    home: home,
    about_us: aboutus,
    order_condition: orderCondition,
    how_buy: toBuy,
    product_info: productInfo,
  },
};
