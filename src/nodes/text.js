const Node = require('./node.js');

class Text extends Node {

  constructor(text) {
    super();
    this.textContent = text;
  }

  get nodeName() {
    return '#text';
  }

  get nodeType() {
    return this.constructor.TEXT_NODE;
  }
}

module.exports = Text;