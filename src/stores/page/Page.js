import swal from 'sweetalert';

import {store} from '../../store';
import {config} from '../../config';
import {http} from '../../utility/http';
import {actions} from '../Action';

export class Page {
  getMenu() {
    let url = `${config.api.url}/page/menu/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.menu.setMain(data);
      }
    });
  }

  getHome() {
    let url = `${config.api.url}/page/home/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.home.setMain(data);
      }
    });
  }

  getAboutus() {
    let url = `${config.api.url}/page/about_us/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.about_us.setMain(data);
      }
    });
  }

  getHowToBuy() {
    let url = `${config.api.url}/page/how_to_buy/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.how_buy.setMain(data);
      }
    });
  }

  getOrderCondition() {
    let url = `${config.api.url}/page/order_condition/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.order_condition.setMain(data);
      }
    });
  }

  getProduct() {
    let url = `${config.api.url}/page/product/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.product_info.setMain(data);
      }
    });
  }

  getProductList() {
    let url = `${config.api.url}/page/product_list/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.product_list.setMain(data);
      }
    });
  }

  getPayment() {
    let url = `${config.api.url}/page/payment/modify`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.payment.setMain(data);
      }
    });
  }

  buildPage() {
    let url = `${config.api.url}/page/build`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        swal({
          title: '',
          text: 'Build เรียบร้อย',
        });
      } else {
        swal({
          title: '',
          text: 'เกิดข้อผิลพลาดขณะ Build ',
        });
      }
    });
  }

  buildToken() {
    let url = `${config.api.url}/project/token/generate`;
    http.put(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        swal({
          title: '',
          text: 'Build เรียบร้อย',
        });
      } else {
        swal({
          title: '',
          text: 'เกิดข้อผิลพลาดขณะ Build ',
        });
      }
    });
  }

  saveAllPage() {
    actions.page.menu.save();
    actions.page.home.save();
    actions.page.how_buy.save();
    actions.page.order_condition.save();
    actions.page.about_us.save();
    actions.page.product_info.save();
    actions.page.payment.save();
    swal({
      title: '',
      text: 'บันทึกเรียบร้อย',
    });
  }

  setMessage(type, text) {
    store.update('PAGE_STORE_MESSAGE', {type: type, text: text});
  }

  backMenu() {
    let data = store.getState().page.manage.selected;
    let isReset = false;
    switch (data.main) {
      case 'Menu':
        isReset = actions.page.menu.resetSelectMenu();
        break;
      case 'Footer':
        isReset = actions.page.footer.resetSelectMenu();
        break;
      case 'Home':
        isReset = actions.page.home.resetSelectMenu();
        break;
      default:
    }

    if (isReset === false) {
      data.main = undefined;
      store.update('PAGE_MENU_SELECTED', {data});
    }
  }

  selectMenu(index) {
    let data = store.getState().page.manage.selected;
    data.main = index;
    store.update('PAGE_MENU_SELECTED', {data});
    switch (index) {
      case 'Menu':
        document.getElementById('page').scrollIntoView();
        break;
      case 'Footer':
        document.getElementById('footer').scrollIntoView();
        break;
      default:
        break;
    }
  }
}

export const action = new Page();
