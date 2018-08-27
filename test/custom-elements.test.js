require('../src/custom-elements.js');

describe('Custom Elements', () => {

  describe('define' ,() => {

    it('throws an error when a constructor is not a function', () => {
      assert.throws(() => customElements.define('not-a-function', {}));
    });

    it('throws an error when a constructor does not extend Element', () => {
      assert.throws(() => customElements.define('not-an-element', MyElement));
    });

    it('throws an error when custom element name is already taken', () => {
      assert.throws(() => customElements.define('not-an-element', MyElement));
    });

    it('assigns constructor to element name', () => {

      // given
      const name = 'my-element';
      class MyElement extends HTMLElement {};

      // when
      customElements.define(name,  MyElement);

      // then
      assert.equal(customElements.registry_.get(name), MyElement);
    });
  });

  describe('get', () => {

    it('returns undefined when constructor is not found', () => {
      assert.equal(customElements.get('never-heard', undefined));
    });

    it('returns constructor assigned to element name', () => {

      // given
      const name = 'another-element';
      class AnotherElement extends HTMLElement {};

      // when
      customElements.define(name,  AnotherElement);

      // then
      assert.equal(customElements.get(name), AnotherElement);
    });
  });

  describe('construct element', () => {

    it('creates an instance with valid element name', () => {

      // given
      class SomeElement extends Element {};

      // when
      customElements.define('some-element', SomeElement);
      const someElement = new SomeElement();

      // then
      assert.equal(someElement.tagName, 'SOME-ELEMENT');
    });
  });
});
