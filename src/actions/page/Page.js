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
    let url = `${config.api.url}/page/aboutus`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.about_us.setData(data);
      }
    });
  }

  getHowToBuy() {
    let url = `${config.api.url}/page/howtobuy`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.how_to_buy.setData(data);
      }
    });
  }

  getOrderCondition() {
    let url = `${config.api.url}/page/ordercondition`;
    http.get(url, {authorization: true}).done(response => {
      if (response.statusCode === http.StatusOK) {
        let data = response.body;
        actions.page.order_condition.setData(data);
      }
    });
  }

  saveAllPage() {

  }

  saveItem() {
    let data = store.getState().page.data;
    let json = data;
    let id = data._id;
    this.setMessage('', '');
    if (id) {
      let list = [];
      for (let item of data.menu.list) {
        if (item.type === 'category') {
          item.value = item.category;
        } else {
          item.value = item.tag;
          item.category = '';
          item.tag = item.value;
        }
        item.category = undefined;
        item.tag = undefined;
        list.push(item);
      }

      data.menu.list = list;
      let url = `${config.api.url}/page/${id}/edit`;
      http.put(url, {json, authorization: true}).done(response => {
        if (response.statusCode === http.StatusOK) {
          this.setMessage('good', 'เสร็จเรียบร้อย');
        } else {
          this.setMessage('error', 'ไม่สามารถบันทึกข้อมูลได้');
        }
      });
    }
  }

  setMessage(type, text) {
    store.update('PAGE_STORE_MESSAGE', {type: type, text: text});
  }

  backMenu() {
    let data = store.getState().page.manage.selected;
    if (data.main === 'Home' || data.main === 'Footer') {
      if (data.level_3 !== undefined) {
        data.level_2 = undefined;
        data.level_3 = undefined;
      } else if (data.level_2 !== undefined) {
        data.level_2 = undefined;
      } else {
        data.main = undefined;
        data.level_2 = undefined;
        data.level_3 = undefined;
      }
    } else {
      data.main = undefined;
      data.level_2 = undefined;
      data.level_3 = undefined;
    }

    store.update('PAGE_MENU_SELECTED', {data});
  }

  selectMenu(index) {
    let data = store.getState().page.manage.selected;
    data.main = index;
    data.level_2 = undefined;
    data.level_3 = undefined;
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

  selectMenuLevel2(index) {
    let data = store.getState().page.manage.selected;
    data.level_2 = index;
    data.level_3 = undefined;
    store.update('PAGE_MENU_SELECTED', {data});
  }

  selectMenuLevel3(index) {
    let data = store.getState().page.manage.selected;
    data.level_3 = index;
    store.update('PAGE_MENU_SELECTED', {data});
  }
}

export const action = new Page();
