const AbstractTextNode = require('./abstract-text-node.js');

class Text extends AbstractTextNode {

  get nodeName() {
    return '#text';
  }

  get nodeType() {
    return this.constructor.TEXT_NODE;
  }
}

module.exports = Text;
