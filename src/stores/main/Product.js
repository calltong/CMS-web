import _ from 'lodash';
import BaseStore from '../BaseStore';

import {config} from '../../config';
import {http} from '../../utils/http';

import {manager} from '../../utility/Manager';
import {box} from '../../utility/MessageBox';
let instance = {
  _id: '',
  type_id: 0,
  content: {
    main: {
      name: '',
      description: '',
      condition: '',
      package_content: '',
    },
    english: {
      name: '',
      description: '',
      condition: '',
      package_content: '',
    },
  },
  price: 990,
  sale_price:690,
  image: '',
  status: '',
  video: '',
  last_update: 0,
  tag_list: [],
  variant_list: [],
};

export class Product extends BaseStore {
  constructor() {
    super();
    this.observable({
      page: {
        index: 1,
        total: 1,
        limit: 20,
        condition: {
          type_id: 0,
          size_id: 0,
        },
      },
      list: [],
      message: {
        type: '',
        text: '',
      },
      edit: {
        variant: {
          index: -1,
          data: undefined,
        },
        colors: [],
      },
      ecommerce: {
        lazada: false,
        street: false,
      },
      data: _.cloneDeep(instance),
    });
  }

  refresh() {
    //store.update('PRODUCT_REFRESH');
  }

  resetItem() {
    this.data = _.cloneDeep(instance);
    this.list = [];
    this.message= {
      type: '',
      text: '',
    };
    this.edit = {
      variant: {
        index: -1,
        data: undefined,
      },
      colors: [],
    };
    this.ecommerce = {
      lazada: false,
      street: false,
    };
    this.page = {
      index: 1,
      total: 1,
      limit: 20,
      condition: {
        type_id: 0,
        size_id: 0,
      },
    };
  }

  async getCountAndList(index) {
    let product = this.toJS();
    let url = `${config.api.url}/product/count`;
    if (product.page.condition.type_id !== 0) {
      url = `${url}?type=${product.page.condition.type_id}`;
    }

    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let data = response.body;
      product.page.total = +data.value;
      this.page = product.page;
      this.getList(index);
    }
  }

  async getList(index) {
    let product = this.toJS();
    product.page.index = index;
    this.page = product.page;

    let limit = product.page.limit;
    let url = `${config.api.url}/product?page=${index}&&limit=${limit}`;
    if (product.page.condition.type_id !== 0) {
      url = `${url}&type=${product.page.condition.type_id}`;
    }

    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let list = response.body;
      this.list = list;
    }
  }

  async setItem(data) {
    let index = -1;
    let variant;
    let colors = [];
    if (data.variant_list.length > 0) {
      colors = await data.variant_list.map(item => {
        return {value: item.color._id, label: item.color.content.main.name, clearableValue: false};
      });

      index = 0;
      variant = data.variant_list[0];
    }

    data.variant_list
    this.data = data;
    this.edit = {
      variant: {
        index,
        data: variant,
      },
      colors: colors,
    };
  }

  async getItem(id) {
    let url = `${config.api.url}/product/${id}/get`;
    let response = await http.get(url, {authorization: true});
    if (response.statusCode === 200) {
      let data = response.body;
      this.setItem(data);
    }
  }

  async saveItem() {
    let product = this.toJS();
    let data = product.data;
    let json = data;
    let id = data._id;

    if (id) {
      let url = `${config.api.url}/product/${id}/edit`;
      let response = await http.put(url, {json, authorization: true});
      //manager.ClosePanel('#Loading');
      return response.statusCode !== 200;
      //box.Display('ไม่สามารถบันทึกได้');
    } else {
      let url = `${config.api.url}/product/create`;
      let response = await http.post(url, {json, authorization: true});
      //manager.ClosePanel('#Loading');
      if (response.statusCode === 201) {
        this.data._id = response.body._id;
        return true;
      } else {
        //box.Display('ไม่สามารถบันทึกได้');
      }
    }

    return false;
  }

  async remove(id) {
    let product = this.toJS();
    let url = `${config.api.url}/product/${id}/delete`;
    let response = await http.delete(url, {authorization: true});
    if (response.statusCode === 200) {
      this.getCountAndList(product.page.index, product.page.limit, product.page.condition);
    }
  }

  selectType(id) {
    this.page.condition.type_id = id;
    this.getCountAndList(1);
  }

  async updateData() {
    let url = `${config.api.url}/product/update`;
    let response = await http.put(url, {authorization: true});
    if (response.statusCode === 200) {
      this.getList();
    }
  }

  selectVariant(index) {
    if (index) {
      this.edit.variant.index = +index;
      this.edit.variant.data = this.data.variant_list[+index];
    } else {
      this.edit.variant.index = -1;
      this.edit.variant.data = undefined;
    }
  }

  setVariant(index, variant) {
    this.data.variant_list[index] = variant;
  }

  async addVariant(color) {
    let variant = {
      color,
      list: [],
      image_list: [],
      image_sq_list: [],
    };
    let data = this.toJS().data;
    data.variant_list.push(variant);
    await this.setItem(data);
    this.selectVariant(data.variant_list.length - 1);
  }

  editVariant(inVariant, color) {
    let data = this.toJS().data;
    data.variant_list[inVariant].color = color;
    this.data = data;
  }

  removeVariant(index) {
    let data = this.toJS().data;
    data.variant_list.splice(index, 1);
    this.setItem(data);
  }

  addImage(inVariant, img) {
    let data = this.toJS().data;
    let variant = data.variant_list[inVariant];
    variant.image_list.push(img);
    this.data.image_list = variant.image_list;
  }

  editImage(inVariant, index, img, width, height) {
    let data = this.toJS().data;
    let variant = data.variant_list[inVariant];
    variant.image_list[index] = img;
    this.data.image_list = variant.image_list;
  }

  removeImage(inVariant, index) {
    let data = this.toJS().data;
    let variant = data.variant_list[inVariant];
    let list = variant.image_list;
    list.splice(index, 1);
    this.data.image_list = variant.image_list;
  }

  addSqImage(inVariant, img, width, height) {
    let data = this.toJS().data;
    let variant = data.variant_list[inVariant];
    variant.image_sq_list.push(img);
    this.data.image_sq_list = variant.image_sq_list;
  }

  editSqImage(inVariant, index, img, width, height) {
    let data = this.toJS().data;
    let variant = data.variant_list[inVariant];
    variant.image_sq_list[index] = img;
    this.data.image_sq_list = variant.image_sq_list;
  }

  removeSqImage(inVariant, index) {
    let data = this.toJS().data;
    let variant = data.variant_list[inVariant];
    let list = variant.image_sq_list;
    list.splice(index, 1);
    this.data.image_sq_list = variant.image_sq_list;
  }
}

export default new Product();
