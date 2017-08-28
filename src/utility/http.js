import cookie from 'react-cookie';
import request from 'then-request';

function resolve(promise) {
  return {
    done: (callback) => {
      promise.done(response => {
        let body = response.body;
        if (body !== null && body !== undefined && body !== '') {
          response.body = JSON.parse(response.body);
        } else {
          response.body = { result: 'unexpected result'};
        }
        callback(response);
      }, (err) => {
        console.log('error:', err);
      });
    },
  };
}

function setAuthorizationHeaders(options) {
  if (!options.headers) {
    options.headers = {};
  }

  if (options.authorization) {
    options.authorization = undefined;
    let token = cookie.load('mtoken');
    options.headers.authorization = token;
  }
  return options;
}

class Http {
  constructor() {
    this.request = request;

    this.StatusOK = 200;
    this.StatusCreated = 201;
  }

  get(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('GET', url, options));
  }

  post(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('POST', url, options));
  }

  put(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('PUT', url, options));
  }

  delete(url, options = {}) {
    options = setAuthorizationHeaders(options);
    return resolve(this.request('DELETE', url, options));
  }
}

export const http = new Http();
