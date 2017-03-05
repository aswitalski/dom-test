const ParentNode = require('../src/nodes/parent-node.js');

describe('Parent Node', () => {

  it('prevents direct instantiation', () => {
    assert.throws(() => {
      new ParentNode();
    }, TypeError, 'Illegal constructor');
  });
});