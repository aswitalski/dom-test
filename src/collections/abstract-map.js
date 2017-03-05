const mapKey = Symbol.for('map');

class AbstractMap {

  constructor() {
    this[mapKey] = new Map();
  }

  get map_() {
    return this[mapKey];
  }

  get array_() {
    return Array.from(this.map_.values());
  }

  get keys_() {
    return Array.from(this.map_.keys());
  }

  get length() {
    return this.map_.size;
  }

  item(index) {
    return this.array_[index];
  }
}

module.exports = AbstractMap;