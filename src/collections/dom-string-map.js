const ProxyUtils = require('../utils/proxy-utils.js');

const attrsKey = Symbol.for('attributes');
const mapKey = Symbol.for('map');

/**
 *  Used in: Element.dataset
 */
class DOMStringMap {

  constructor(attributes) {
    this[attrsKey] = attributes;
    this[mapKey] = new Map();
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop.constructor === String) {
          if (prop.endsWith('_')) {
            return target[prop];
          } else {
            return target.map_.get(prop);
          }
        }
      },
      set: ProxyUtils.setDataAttribute(attributes),
      deleteProperty: ProxyUtils.deleteDataAttribute(attributes),
    })
  }

  get map_() {
    return this[mapKey];
  }

  get attributes_() {
    return this[attrsKey];
  }

  get length_() {
    return this.map_.size;
  }
}

module.exports = DOMStringMap;