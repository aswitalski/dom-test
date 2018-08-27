class Node {

  constructor() {
    if (this.constructor === Node) {
      throw new TypeError('Illegal constructor');
    }
    this.parentNode = null;
  }

  remove() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }

  replaceWith(node) {
    if (this.parentNode) {
      this.parentNode.replaceChild(node, this);
    }
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

  static get DOCUMENT_FRAGMENT_NODE() {
    return 11;
  }
}

module.exports = Node;
