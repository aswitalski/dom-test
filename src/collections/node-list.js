const AbstractList = require('./abstract-list.js');
const ProxyUtils = require('../utils/proxy-utils.js');

/**
 *  Used in: Node.childNodes
 */
class NodeList extends AbstractList {

  constructor() {
    super();
    return new Proxy(this, {
      get: ProxyUtils.getByIndex,
    });
  }
}

module.exports = NodeList;