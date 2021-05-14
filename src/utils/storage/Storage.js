/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable max-classes-per-file */
class StorageCell {
  constructor(data, timeout) {
    this.data = data;
    this.timeout = timeout; // 超时时间，单位秒
    this.createTime = Date.now(); // 创建时间
  }
}

class Storage {
  constructor() {}

  get(name) {
    let cachecell = null;
    try {
      cachecell = JSON.parse(localStorage.getItem(name));
      if (!cachecell) return null;
      const currentTime = Date.now();
      const overTime = (currentTime - cachecell.createTime) / 1000;
      // 手动设置了缓存且超时再清除
      if (cachecell.timeout !== 0 && overTime > cachecell.timeout) {
        this.remove(name);
        cachecell.data = null;
      }
    } catch (e) {
      console.error("storage get fail", e);
    }
    if (cachecell.data) {
      return cachecell.data;
    }
    return null;
  }

  // 默认永久缓存(0)
  set(name, data, timeout = 0) {
    const cachecell = new StorageCell(data, timeout);
    try {
      localStorage.setItem(name, JSON.stringify(cachecell));
      return true;
    } catch (e) {
      return false;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  has(key) {
    try {
      return key in localStorage;
    } catch (e) {
      console.err(e);
    }
  }

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default new Storage();
