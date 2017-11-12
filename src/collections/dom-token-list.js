const AbstractList = require('./abstract-list.js');

const ProxyUtils = require('../utils/proxy-utils.js');

/**
 *  Used in: Element.classList
 */
class DOMTokenList extends AbstractList {

  constructor() {
    super();
    return new Proxy(this, {
      get: ProxyUtils.getByIndex,
    });
  }

  contains(name) {
    return this.array_.includes(name);
  }

  add(name) {
    if (this.contains(name)) {
      return;
    }
    this.array_.push(name);
  }

  remove(name) {
    const index = this.array_.indexOf(name);
    if (index >= 0) {
      this.array_.splice(index, 1);
      this.remove(name);
    }
  }

  toggle(name, enabled = !this.contains(name)) {
    return enabled ? this.add(name) : this.remove(name);
  }

  set value(names = '') {
    this.array_.length = 0;
    if (!names) {
      return;
    }
    names.split(' ').forEach(name => {
      this.add(name);
    });
  }

  get value() {
    return this.array_.join(' ');
  }
}

module.exports = DOMTokenList;