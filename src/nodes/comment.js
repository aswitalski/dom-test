const Node = require('./node.js');

class Comment extends Node {

  constructor(text) {
    super();
    this.textContent = text;
  }

  get nodeName() {
    return '#comment';
  }

  get nodeType() {
    return this.constructor.COMMENT_NODE;
  }
}

module.exports = Comment;