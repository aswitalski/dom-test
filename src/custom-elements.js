class CustomElementRegistry {

  constructor() {
    this.registry_ = new Map();
  }

  define(name, ElementClass) {
    if (typeof ElementClass !== 'function') {
      throw new Error('The provided constructor is not a function!');
    }
    if (!(ElementClass.prototype instanceof Element)) {
      throw new Error('The provided constructor does not extend the Element');
    }
    if (this.registry_.get(name)) {
      throw new Error('This name has already been used with this registry');
    }
    this.registry_.set(name, ElementClass);
  }

  get(name) {
    return this.registry_.get(name);
  }

  upgrade() {
    throw new Error('Not implemented!');
  }
}

global.customElements = new CustomElementRegistry(); 
