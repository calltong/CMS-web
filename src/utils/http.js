import humps from 'humps';
import request from 'then-request';

export class Http {
  constructor() {
    this.httpReq = request;
  }

  setToken(val) {
    this.token = val;
  }

  setAuthorization(options) {
    if (!options.headers) options.headers = {};
    options.headers['Authorization'] = this.token;

    return options;
  }

  parseBody(response) {
    response.body = JSON.parse(response.body);
    return response;
  }

  async get(url, options = {}) {
    options = this.setAuthorization(options);
    let response = await this.httpReq('GET', url, options);
    return this.parseBody(response);
  }

  async post(url, options = {}) {
    options = this.setAuthorization(options);
    options.json = humps.decamelizeKeys(options.json);

    let response = await this.httpReq('POST', url, options);
    return this.parseBody(response);
  }

  async put(url, options = {}) {
    options = this.setAuthorization(options);
    options.json = humps.decamelizeKeys(options.json);

    let response = await this.httpReq('PUT', url, options);
    return this.parseBody(response);
  }

  async delete(url, options = {}) {
    options = this.setAuthorization(options);
    let response = await this.httpReq('DELETE', url, options);
    return this.parseBody(response);
  }
}

export const http = new Http();
export default http;
