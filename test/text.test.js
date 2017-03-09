require('../src/document.js');

describe('Text', () => {

  it('uses constructor argument as text content', () => {

    // given
    const text = document.createTextNode('text');

    // then
    assert.equal(text.textContent, 'text');
  });

  it('converts constructor argument to string', () => {
    assert.equal(document.createTextNode(null).textContent, 'null');
    assert.equal(document.createTextNode(undefined).textContent, 'undefined');
    assert.equal(document.createTextNode(10).textContent, '10');
  });

  it('throws an exception for symbol value', () => {

    // given
    const text = document.createTextNode('');

    // then
    assert.throws(() => {
      text.textContent = Symbol.for('invalid');
    }, TypeError, /Cannot convert a Symbol value to a string/);
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
