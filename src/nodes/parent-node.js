const Node = require('./node.js');
const NodeList = require('../collections/node-list.js');

const assertIsNode = (node, method, index) => {
  if (node && !(node instanceof Node)) {
    throw new TypeError(`Failed to execute '${method}' on 'Node': ` +
      `parameter ${index} is not of type 'Node'.`);
  }
};

class ParentNode extends Node {

  constructor() {
    super();
    this.childNodes = new NodeList();
    if (this.constructor === ParentNode) {
      throw new TypeError('Illegal constructor');
    }
  }

  hasChildNodes() {
    return this.childNodes.length > 0;
  }

  contains(node) {
    assertIsNode(node, 'contains', 1);
    return this.childNodes.array_.includes(node);
  }

  get firstChild() {
    return this.childNodes.array_[0] || null;
  }

  get lastChild() {
    return this.childNodes.array_[this.childNodes.length - 1] || null;
  }

  appendChild(node) {
    assertIsNode(node, 'appendChild', 1);
    node.parentNode = this;
    this.childNodes.array_.push(node);
  }

  insertBefore(node, sibling) {
    assertIsNode(node, 'insertBefore', 1);
    assertIsNode(sibling, 'insertBefore', 2);
    if (sibling === null || sibling === undefined) {
      this.appendChild(node);
      return;
    }
    if (this.childNodes.array_.includes(sibling)) {
      const index = this.childNodes.array_.indexOf(sibling);
      node.parentNode = this;
      this.childNodes.array_.splice(index, 0, node);
    } else {
      throw new Error('The node before which the new node is to be inserted ' +
        'is not a child of this node.');
    }
  }

  replaceChild(node, replaced) {
    assertIsNode(node, 'replaceChild', 1);
    assertIsNode(replaced, 'replaceChild', 2);
    if (this.childNodes.array_.includes(replaced)) {
      const index = this.childNodes.array_.indexOf(replaced);
      replaced.parentNode = null;
      node.parentNode = this;
      this.childNodes.array_.splice(index, 1, node);
    } else {
      throw new Error('The node to be replaced is not a child of this node.');
    }
  }

  removeChild(removed) {
    assertIsNode(removed, 'removeChild', 1);
    if (this.childNodes.array_.includes(removed)) {
      const index = this.childNodes.array_.indexOf(removed);
      removed.parentNode = null;
      this.childNodes.array_.splice(index, 1);
    } else {
      throw new Error('The node to be removed is not a child of this node.');
    }
  }
}

module.exports = ParentNode;