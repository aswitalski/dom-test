require('../src/document.js');

describe('Comment', () => {

  it('uses constructor argument as text content', () => {

    // given
    const comment = document.createComment('some comment');

    // then
    assert.equal(comment.textContent, 'some comment');
  });

  it('converts constructor argument to string', () => {
    assert.equal(document.createComment(50).textContent, '50');
    assert.equal(document.createComment(null).textContent, 'null');
    assert.equal(document.createComment(undefined).textContent, 'undefined');
  });

  it('throws an exception for symbol value', () => {

    // given
    const comment = document.createComment('');

    // then
    assert.throws(() => {
      comment.textContent = Symbol.for('nice try');
    }, TypeError, /Cannot convert a Symbol value to a string/);
  });

  it('returns #comment as node name', () => {

    // given
    const comment = document.createComment('comment');

    // then
    assert.equal(comment.nodeName, '#comment');
  });

  it('returns Node.COMMENT_NODE as node type', () => {

    // given
    const comment = document.createComment('comment');

    // then
    assert.equal(comment.nodeType, Node.COMMENT_NODE);
  });
});
