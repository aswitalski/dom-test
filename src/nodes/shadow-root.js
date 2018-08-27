const DocumentFragment = require('./document-fragment.js');

class ShadowRoot extends DocumentFragment {

  constructor(mode, host) {
    super();
    this.mode = mode;
    this.host = host;
  }
}

module.exports = ShadowRoot;
