class Config {

  constructor() {

    this.api = {
      url: 'http://localhost:8081',
    };

    this.cookie = {
      path: '/manager/',
    };
  }

  setup(host) {
    console.log('host:', host);
    if (host.includes('139.59.109.169')) {
      this.api = {
        url: 'http://139.59.109.169:8081',
      };
    } else {
      this.api = {
        url: 'http://localhost:8081',
      };
    }
  }
}

export const config = new Config();
