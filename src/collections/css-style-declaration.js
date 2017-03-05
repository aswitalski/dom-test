const AbstractMap = require('./abstract-map.js');
const ProxyUtils = require('../utils/proxy-utils.js');

const SUPPORTED_STYLES = require('../utils/supported-styles.js');

const lowerDash = name => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 *  Used in: Element.style
 */
class CSSStyleDeclaration extends AbstractMap {

  constructor() {
    super();
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop.constructor === String) {
          const index = parseInt(prop);
          if (prop === String(index)) {
            return Array.from(target.map_.keys())[index];
          }
          const name = lowerDash(prop);
          const value = target.map_.get(name);
          if (value) {
            return value;
          }
        }
        return target[prop] || '';
      },
      set: (target, name, value) => {
        if (SUPPORTED_STYLES.includes(name)) {
          const lowerDashName = lowerDash(name);
          target.setProperty(lowerDashName, value);
        } else {
          target[name] = value;
        }
        return true;
      },
    });
  }

  getPropertyValue(name) {
    return this.map_.get(name) || '';
  }

  setProperty(name, value) {
    if (SUPPORTED_STYLES.map(lowerDash).includes(name)) {
      this.map_.set(name, value);
    }
  }

  removeProperty(name) {
    const value = this.map_.get(name);
    return this.map_.delete(name) ? value : '';
  }

  item(index) {
    return this.keys_[index];
  }

  get cssText() {
    const entries = Array.from(this.map_.entries());
    return entries.map(([name, value]) => `${name}: ${value};`).join(' ');
  }

  set cssText(text) {
    const entries = text
      .split(';')
      .map(entry => entry.trim())
      .filter(entry => entry)
      .map(entry => entry.split(':'));
    this.map_.clear();
    entries.forEach(([name, value]) => {
      this.setProperty(name.trim(), value.trim());
    });
  }
}

module.exports = CSSStyleDeclaration;