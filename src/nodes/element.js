const ParentNode = require('./parent-node.js');

const CSSStyleDeclaration = require('../collections/css-style-declaration.js');
const DOMStringMap = require('../collections/dom-string-map.js');
const DOMTokenList = require('../collections/dom-token-list.js');
const HTMLCollection = require('../collections/html-collection.js');
const NamedNodeMap = require('../collections/named-node-map.js');

const eventListenersKey = Symbol('event-listeners');

class Element extends ParentNode {

  constructor(name) {
    super();
    this.tagName = name.toUpperCase();
    this.children = new HTMLCollection(this.childNodes.array_);
    this.attributes = new NamedNodeMap();
    this.dataset = new DOMStringMap(this.attributes);
    this.style = new CSSStyleDeclaration();
    this.classList = new DOMTokenList();
    this[eventListenersKey] = {};
  }

  get nodeName() {
    return this.tagName;
  }

  get nodeType() {
    return this.constructor.ELEMENT_NODE;
  }

  get firstElementChild() {
    return this.children[0] || null;
  }

  get lastElementChild() {
    return this.children[this.children.length - 1] || null;
  }

  get childElementCount() {
    return this.children.length;
  }

  getAttribute(name) {
    const attr = this.attributes.getNamedItem(name);
    return attr ? attr.value : null;
  }

  setAttribute(name, value) {
    const attr = document.createAttribute(name);
    attr.value = value;
    this.attributes.setNamedItem(attr);
  }

  removeAttribute(name) {
    this.attributes.removeNamedItem(name);
  }

  set className(names) {
    this.classList.value = names;
  }

  get className() {
    return this.classList.value;
  }

  addEventListener(name, listener) {
    this.eventListeners_[name] = this.eventListeners_[name] || [];
    this.eventListeners_[name].push(listener);
  }

  removeEventListener(name, listener) {
    const listeners = this.eventListeners_[name];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    }
  }

  get eventListeners_() {
    return this[eventListenersKey];
  }
}

module.exports = Element;