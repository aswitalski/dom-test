const AbstractMap = require('./abstract-map.js');

const ProxyUtils = require('../utils/proxy-utils.js');

/**
 *  Used in: Element.attributes
 */
class NamedNodeMap extends AbstractMap {

  constructor() {
    super();
    return new Proxy(this, {
      get: ProxyUtils.getByNameAndIndex,
      // ownKeys: ProxyUtils.getIndices,
    })
  }

  getNamedItem(name) {
    return this.map_.get(name) || null;
  }

  setNamedItem(attr) {
    const previousAttr = this.map_.get(attr.name) || null;
    this.map_.set(attr.name, attr);
    return previousAttr;
  }

  removeNamedItem(name) {
    if (!this.map_.get(name)) {
      throw new Error(`Failed to execute 'removeNamedItem' on 'NamedNodeMap': ` +
        `No item with name '${name}' was found.`);
    }
    const removedAttr = this.map_.get(name);
    this.map_.delete(name);
    return removedAttr;
  }
}

module.exports = NamedNodeMap;
