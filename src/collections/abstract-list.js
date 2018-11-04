const Iterator = class {
  constructor(items, converter = item => item) {
    this[Symbol.iterator] = function*() {
      let i = 0;
      for (const item of items) {
        yield converter(item, i++);
      }
    };
  }
};

const itemsKey = Symbol.for('items');

class AbstractList {

  constructor() {
    this[itemsKey] = [];
    this[Symbol.iterator] = new Iterator(this.array_)[Symbol.iterator];
  }

  get array_() {
    return this[itemsKey];
  }

  forEach(callback, context) {
    let i = 0;
    for (const item of this.array_) {
      callback.apply(context, [item, i++, this]);
    }
  }

  keys() {
    return new Iterator(this.array_, (item, index) => index);
  }

  values() {
    return new Iterator(this.array_, (item, index) => item);
  }

  entries() {
    return new Iterator(this.array_, (item, index) => [index, item]);
  }

  get length() {
    return this.array_.length;
  }

  static get Iterator() {
    return Iterator;
  }
}

module.exports = AbstractList;
