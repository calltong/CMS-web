import {action as product} from './Product';
import {action as type} from './Type';
import {action as size} from './Size';
import {action as order} from './OrderAction';
import {action as ecommerce} from './EcommerceAction';
import {action as page} from './page/Page';
import {action as menuPage} from './page/Menu';
import {action as homePage} from './page/Home';
import {action as footerPage} from './page/Footer';
import {action as aboutusPage} from './page/Aboutus';
import {action as orderConditionPage} from './page/OrderCondition';
import {action as toBuyPage} from './page/HowToBuy';
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
    menu: menuPage,
    footer: footerPage,
    home: homePage,
    about_us: aboutusPage,
    order_condition: orderConditionPage,
    how_to_buy: toBuyPage,
  },
  menuPage,
  homePage,
  footerPage,
  aboutusPage,
  orderConditionPage,
  toBuyPage,
};
