class Node {

  constructor() {
    if (this.constructor === Node) {
      throw new TypeError('Illegal constructor');
    }
    this.parentNode = null;
  }

  get parentElement() {
    if (this.parentNode && this.parentNode.constructor === Element) {
      return this.parentNode;
    }
    return null;
  }

  static get ELEMENT_NODE() {
    return 1;
  }

  static get TEXT_NODE() {
    return 3;
  }

  static get COMMENT_NODE() {
    return 8;
  }
}

module.exports = Node;