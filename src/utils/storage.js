function setValue(cname, cvalue) {
  let message = JSON.stringify(cvalue);
  localStorage.setItem(cname, message);
}

function getValue(cname) {
  let temp = localStorage.getItem(cname);
  if (temp !== undefined && temp !== '') {
    return JSON.parse(temp);
  } else {
    return {};
  }
}

function removeValue(cname) {
  localStorage.removeItem(cname);
}

const USER = 'user';

export default class Storage {
  readUser() {
    let item = getValue(USER);
    if (item) {
      let dif = Date.now() - item.time;
      if (dif < 1200000) return item.data;
    }
    return undefined;
  }

  saveUser(user, token) {
    let item = {
      time: Date.now(),
      data: {
        user,
        token,
      },
    };
    setValue(USER, item);
  }

  removeUser() {
    removeValue(USER);
  }
}
