const ParentNode = require('./parent-node.js');

class DocumentFragment extends ParentNode {

  get nodeType() {
    return this.constructor.DOCUMENT_FRAGMENT_NODE;
  }
}

module.exports = DocumentFragment;
