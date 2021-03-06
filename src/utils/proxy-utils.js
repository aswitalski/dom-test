class ProxyUtils {

  static get getByIndex() {
    return (target, prop) => {
      if (prop.constructor === String) {
        const index = parseInt(prop);
        if (prop === String(index)) {
          return target.array_[index];
        }
      }
      return target[prop];
    };
  }

  static get getByNameAndIndex() {
    return (target, prop) => {
      if (prop.constructor === String) {
        const index = parseInt(prop);
        if (prop === String(index)) {
          return target.array_[index];
        }
        const value = target.map_.get(prop);
        if (value) {
          return value;
        }
      }
      return target[prop];
    };
  }

  static get getMapKeys() {
    return target => Array.from(target.map_.keys());
  }

  static get hasKeyInMap() {
    return (target, prop) => target.map_.has(prop);
  }

  static get getMapPropertyDescriptor() {
    return (target, prop) => target.map_.has(prop) ? {
      value: target.map_.get(prop),
      writable: true,
      enumerable: true,
      configurable: true,
    } : undefined;
  }

  static setDataAttribute(attributes) {
    return (target, prop, value) => {
      if (typeof value === 'symbol') {
        throw new TypeError('Cannot convert a Symbol value to a string');
      }
      const getAttrName = () => {
        return ('data' + prop[0].toUpperCase() + prop.slice(1))
          .replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      };
      target.map_.set(prop, value + '');
      const attr = new Attr(getAttrName());
      attr.value = value + '';
      attributes.setNamedItem(attr);
      return true;
    }
  }

  static deleteDataAttribute(attributes) {
    return (target, prop) => {
      const getAttrName = () => {
        return ('data' + prop[0].toUpperCase() + prop.slice(1))
          .replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      };
      target.map_.delete(prop);
      const attr = getAttrName(prop);
      attributes.removeNamedItem(attr);
      return true;
    }
  }
}

module.exports = ProxyUtils;
