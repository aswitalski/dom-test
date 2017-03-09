const AbstractTextNode = require('./abstract-text-node.js');

class Comment extends AbstractTextNode {

  get nodeName() {
    return '#comment';
  }

  get nodeType() {
    return this.constructor.COMMENT_NODE;
  }
}

module.exports = Comment;
