import {action as product} from './ProductAction';
import {action as type} from './TypeAction';
import {action as size} from './SizeAction';
import {action as order} from './OrderAction';
import {action as page} from './PageAction';
import {action as menuPage} from './MenuPage';
import {action as homePage} from './HomePage';
import {action as footerPage} from './FooterPage';
import {action as ecommerce} from './EcommerceAction';
import {action as aboutusPage} from './AboutusPage';
import {action as orderConditionPage} from './OrderConditionPage';
import {action as toBuyPage} from './ToBuyPage';
import {action as dialog} from './DialogAction';

export const actions = {
  product,
  type,
  size,
  order,
  ecommerce,
  dialog,
  page,
  menuPage,
  homePage,
  footerPage,
  aboutusPage,
  orderConditionPage,
  toBuyPage,
};
