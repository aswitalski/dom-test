require('../src/document.js');

describe('Comment', () => {

  it('uses constructor argument as text content', () => {

    // given
    const comment = document.createComment('some comment');

    // then
    assert.equal(comment.textContent, 'some comment');
  });

  it('returns #comment as node name', () => {

    // given
    const comment = document.createComment('comment');

    // then
    assert.equal(comment.nodeName, '#comment');
  });

  it('returns COMMENT_NODE as node type', () => {

    // given
    const comment = document.createComment('comment');

    // then
    assert.equal(comment.nodeType, Node.COMMENT_NODE);
  });
});