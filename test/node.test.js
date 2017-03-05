require('../src/document.js');

describe('Node', () => {

  it('cannot be instantiated directly', () => {
    assert.throws(() => {
      new Node();
    }, TypeError, 'Illegal constructor');
  });

  describe('parent node', () => {

    it('returns parent node', () => {

      // given
      const element = document.createElement('div');
      const text = document.createTextNode('text');

      // when
      element.appendChild(text);

      // then
      assert.equal(text.parentNode, element);
    });

    it('returns null when not attached', () => {

      // given
      const comment = document.createComment('comment');

      // then
      assert.equal(comment.parentNode, null);
    });
  });

  describe('parent element', () => {

    it('returns closest element ancestor', () => {

      // given
      const parent = document.createElement('div');
      const child = document.createElement('span');

      // when
      parent.appendChild(child);

      // then
      assert.equal(child.parentElement, parent);
    });

    it('returns null when not attached', () => {

      // given
      const spanElement = document.createElement('span');

      // then
      assert.equal(spanElement.parentElement, null);
    });
  });
});