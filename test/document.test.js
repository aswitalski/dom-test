require('../src/document.js');

describe('HTML Document', () => {

  describe('defines', () => {

    it('document.documentElement', () => {
      assert(document.documentElement);
      assert(document.documentElement.tagName, 'HTML');
    });

    it('document.body', () => {
      assert(document.body);
      assert(document.body.tagName, 'BODY');
    });
  })

  describe('=> createElement()', () => {

    it('creates an element', () => {

      // when
      const div = document.createElement('div');

      // then
      assert(div instanceof Element);
      assert.equal(div.tagName, 'DIV');
      assert.deepEqual(div.dataset, {});
      assert(Object.keys(div.style).includes('color'));
      assert(Object.keys(div.style).includes('backgroundColor'));
      assert.deepEqual(Array.from(div.childNodes), []);
    });
  });

  describe('=> createComment()', () => {

    it('creates a comment', () => {

      // when
      const comment = document.createComment('comment');

      // then
      assert(comment instanceof Comment);
      assert.deepEqual(comment.textContent, 'comment');
    });
  });

  describe('=> createTextNode()', () => {

    it('creates a text node', () => {

      // when
      const text = document.createTextNode('text node');

      // then
      assert(text instanceof Text);
      assert.equal(text.textContent, 'text node');
    });
  });

  describe('=> createAttribute()', () => {

    it('creates an attribute', () => {

      // when
      const attr = document.createAttribute('value');

      // then
      assert(attr instanceof Attr);
      assert.equal(attr.name, 'value');
      assert.equal(attr.value, '');
    });
  });
});
