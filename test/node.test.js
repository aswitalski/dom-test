require('../src/document.js');

describe('Node', () => {

  it('cannot be instantiated directly', () => {
    assert.throws(() => {
      new Node();
    }, TypeError, 'Illegal constructor');
  });

  describe('remove', () => {

    it('removes the node from the parent', () => {

      // given
      const node = document.createTextNode('text');
      const element = document.createElement('span');
      element.appendChild(node);

      // when
      node.remove();

      // then
      assert.equal(element.hasChildNodes(), false);
      assert.equal(node.parentNode, null);
    });

    it('ignores the call if not attached', () => {

      // given
      const node = document.createComment('comment');

      // when
      node.remove();

      // then
      assert.equal(node.parentNode, null);
    })
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