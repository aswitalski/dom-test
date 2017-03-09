const Node = require('./node.js');

const textContentKey = Symbol('text-content');

class AbstractTextNode extends Node {

  constructor(text) {
    super();
    this.textContent = text;
  }

  set textContent(text) {
    if (typeof text === 'symbol') {
      throw new TypeError('Cannot convert a Symbol value to a string');
    }
    this[textContentKey] = String(text);
  }

  get textContent() {
    return this[textContentKey];
  }
}

module.exports = AbstractTextNode;
