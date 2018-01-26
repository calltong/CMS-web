import _ from 'lodash';

import BaseStore from '../BaseStore';

import {config} from '../../config';
import {http} from '../../utils/http';
import history from '../../utils/history';

let instance = {
  _id: undefined,
  code: '#FFFFFF',
  content: {
    main: {
      name: '',
    },
    english: {
      name: '',
    },
  },
};

export class Color extends BaseStore {
  constructor() {
    super();
    this.observable({
      page: {
        index: 1,
        total: 1,
        limit: 10,
      },
      list: [],
      data: _.cloneDeep(instance),
    });
  }

  resetItem() {
    this.data = _.cloneDeep(instance);
  }

  async getList(check) {
    let color = this.toJS();
    let len = color.list.length;
    if (check === undefined || len === 0) {
      let url = `${config.api.url}/color`;
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
    this.data = data;
  }

  async getItem(id) {
    let url = `${config.api.url}/color/${id}`;
    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      this.setItem(response.body);
    }
  }

  async saveItem() {
    let data = this.toJS().data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/color/${id}/edit`;
      let response = await http.put(url, {json: data, authorization: true});
      if (response.statusCode === 200) {
        history.push('/color');
      }
    } else {
      let url = `${config.api.url}/color/create`;
      let response = await http.post(url, {json: data, authorization: true});
      if (response.statusCode === 201) {
        history.push('/color');
      }
    }
  }

  async remove(id) {
    let url = `${config.api.url}/color/${id}/delete`;
    let response = await http.delete(url, {authorization: true});
    if (response.statusCode === 200) {
      this.getList();
    }
  }
}

export default new Color();
