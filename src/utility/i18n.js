import _ from 'lodash';

const dictionary = {
  navbar: {
    product: { en: 'PRODUCT', th: 'สินค้า' },
    service: { en: 'SERVICE', th: 'บริการ' },
    solution: { en: 'SOLUTION', th: 'โซลูชั่น' },
    promotion: { en: 'PROMOTION', th: 'โปรโมชั่น' },
    search: { en: 'Search...', th: 'ค้นหา...' },
    pcs: { en: 'pcs.', th: 'ชิ้น' },
  },
  footer: {
    help: { en: 'PRODUCT', th: 'สินค้า' },
  },
  home: {},
};

class I18N {
  constructor(dict, lang = 'th') {
    this.dict = dict;
    this.lang = lang;
  }

  language(lang) {
    this.lang = lang;
  }

  translate(key) {
    return _.get(this.dict, `${key}.${this.lang || 'en'}`);
  }
}

export const i18n = new I18N(dictionary);
export const alt = (key) => i18n.translate(key);
