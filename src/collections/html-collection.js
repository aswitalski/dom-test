const ProxyUtils = require('../utils/proxy-utils.js');

const nodesKey = Symbol('nodes');

/**
 *  Used in: Element.children
 */
class HTMLCollection {

  constructor(items) {
    this[nodesKey] = items;
    return new Proxy(this, {
      get: ProxyUtils.getByIndex,
    });
  }

  get length() {
    return this.array_.length;
  }

  item(index) {
    return this.array_[index];
  }

  get array_() {
    return this[nodesKey].filter(item => item.constructor === Element);
  }
}

module.exports = HTMLCollection;