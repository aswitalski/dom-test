require('../src/document.js');

describe('Text', () => {

  it('uses constructor argument as text content', () => {

    // given
    const text = document.createTextNode('text');

    // then
    assert.equal(text.textContent, 'text');
  });

  it('returns #text as node name', () => {

    // given
    const text = document.createTextNode('text');

    // then
    assert.equal(text.nodeName, '#text');
  });

  it('returns Node.TEXT_NODE as node type', () => {

    // given
    const text = document.createTextNode('comment');

    // then
    assert.equal(text.nodeType, Node.TEXT_NODE);
  });
});