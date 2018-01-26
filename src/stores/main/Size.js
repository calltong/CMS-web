import _ from 'lodash';

import BaseStore from '../BaseStore';

import {config} from '../../config';
import {http} from '../../utils/http';
import {history} from '../../utils/history';

let instance = {
  _id: undefined,
  code: '',
  content: {
    main: {
      name: '',
    },
  },
  tag_list: [],
  ecommerce: {
    lazada: {
      code: '',
    },
  },
};

export class Size extends BaseStore {
  constructor() {
    super();
    this.observable({
      page: {
        index: 1,
        total: 1,
        limit: 10,
      },
      list: [],
      select_list: [],
      data: _.cloneDeep(instance),
    });
  }

  resetItem() {
    this.page = {
      index: 1,
      total: 1,
      limit: 10,
    };
    this.list = [];
    this.select_list = [];
    this.data = _.cloneDeep(instance);
  }

  async getList(check) {
    let len = this.toJS().list.length;
    if (check === undefined || len === 0) {
      this.list = [];
      this.select_list = [];
      let url = `${config.api.url}/prosize`;
      let response = await http.get(url, {authorization: true});
      if (response.statusCode === 200) {
        let list = response.body;
        this.select_list = list.map(item => {
          return {value: item._id, label: item.content.main.name, clearableValue: false};
        });
        this.list = list;

      }
    }
  }

  setItem(data) {
    if (!data.ecommerce) {
      data.ecommerce = {
        lazada: {
          code: '',
        },
      };
    }
    this.data = data;
  }

  async getItem(id) {
    let url = `${config.api.url}/prosize/${id}`;
    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let data = response.body;
      this.setItem(data);
    }
  }

  async saveItem() {
    let data = this.toJS().data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/prosize/${id}/edit`;
      let response = await http.put(url, {json, authorization: true});
      if (response.statusCode === 200) {
        history.push('/size');
      }
    } else {
      let url = `${config.api.url}/prosize/create`;
      let response = await http.post(url, {json, authorization: true});
      if (response.statusCode === 201) {
        history.push('/size');
      }
    }
  }

  async remove(id) {
    let url = `${config.api.url}/prosize/${id}/delete`;
    let response = await http.delete(url, {authorization: true});
    if (response.statusCode === 200) {
      this.getList();
    }
  }

  async updateData() {
    let url = `${config.api.url}/prosize/update`;
    let response = await http.put(url, {authorization: true});
    if (response.statusCode === 200) {
      this.getList();
    }
  }
}

export default new Size();
