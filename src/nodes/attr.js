const Node = require('./node.js');

const valueKey = Symbol('value');

class Attr {

  constructor(name) {
    this.name = name;
    this.value = '';
    return new Proxy(this, {
      set: (target, prop, value) => {
        if (prop === 'value') {
          target.value = value + '';
        } else {
          target[prop] = value;
        }
        return true;
      }
    });
  }
}

module.exports = Attr;