const NodeList = require('../src/collections/node-list.js');
const Iterator = NodeList.Iterator;

describe('Node List', () => {

  const createNodeList = (...items) => {
    const nodeList = new NodeList();
    items.forEach(item => {
      nodeList.array_.push(item);
    });
    return nodeList;
  };

  it('is iterable', () => {

    // given
    const nodeList = createNodeList('A', 'B', 'C', 'D');

    // then
    assert.equal(nodeList[Symbol.iterator].constructor.name, 'GeneratorFunction');
    assert.deepEqual(Array.from(nodeList), ['A', 'B', 'C', 'D']);
  });

  describe('for each', () => {

    it('does not invoke callback for an empty list', () => {

      // given
      const nodeList = new NodeList();
      const callback = sinon.spy();

      // when
      nodeList.forEach(callback);

      // then
      assert(callback.notCalled);
    });

    it('invokes callback once for each item', () => {

      // given
      const nodeList = createNodeList('A', 'B');
      const callback = sinon.spy();

      // when
      nodeList.forEach(callback);

      // then
      assert(callback.called);
      assert(callback.calledTwice);

      assert.equal(callback.firstCall.thisValue, undefined);

      assert.equal(callback.firstCall.args[0], 'A');
      assert.equal(callback.firstCall.args[1], 0);
      assert.equal(callback.firstCall.args[2], nodeList);

      assert.equal(callback.secondCall.args[0], 'B');
      assert.equal(callback.secondCall.args[1], 1);
      assert.equal(callback.secondCall.args[2], nodeList);
    });

    it('invokes callback in specified context once for each item', () => {

      // given
      const nodeList = createNodeList('X', 'Y');
      const context = Symbol('context');
      const callback = sinon.spy();

      // when
      nodeList.forEach(callback, context);

      // then
      assert(callback.called);
      assert(callback.calledTwice);

      assert.equal(callback.firstCall.thisValue, context);

      assert.equal(callback.firstCall.args[0], 'X');
      assert.equal(callback.firstCall.args[1], 0);
      assert.equal(callback.firstCall.args[2], nodeList);

      assert.equal(callback.secondCall.args[0], 'Y');
      assert.equal(callback.secondCall.args[1], 1);
      assert.equal(callback.secondCall.args[2], nodeList);
    });
  });

  describe('keys', () => {

    it('returns iterator', () => {
      // given
      const nodeList = createNodeList();
      // when
      const keysIterator = nodeList.keys();
      // then
      assert(keysIterator.constructor, Iterator);
    });

    it('iterates through indices', () => {
      // given
      const nodeList = createNodeList('A', 'B', 'C', 'D');
      // when
      const keysIterator = nodeList.keys();
      // then
      assert.deepEqual(Array.from(keysIterator), [0, 1, 2, 3]);
    });
  });

  describe('values', () => {

    it('returns iterator', () => {
      // given
      const nodeList = createNodeList();
      // when
      const keysIterator = nodeList.keys();
      // then
      assert(keysIterator.constructor, Iterator);
    });

    it('iterates through nodes', () => {
      // given
      const nodeList = createNodeList('A', 'B', 'C', 'D');
      // when
      const valuesIterator = nodeList.values();
      // then
      assert.deepEqual(Array.from(valuesIterator), ['A', 'B', 'C', 'D']);
    });
  });

  describe('entries', () => {

    it('returns an iterator', () => {
      // given
      const nodeList = createNodeList();
      // when
      const entriesIterator = nodeList.entries();
      // then
      assert(entriesIterator.constructor, Iterator);
    });

    it('iterates through arrays of [index, node] entries', () => {
      // given
      const nodeList = createNodeList('A', 'B', 'C', 'D');
      // when
      const valuesIterator = nodeList.entries();
      // then
      assert.deepEqual(Array.from(valuesIterator), [
        [0, 'A'],
        [1, 'B'],
        [2, 'C'],
        [3, 'D']
      ]);
    });
  });

  describe('length', () => {

    it('returns zero for empty list', () => {
      assert.equal(createNodeList().length, 0);
    });

    it('returns number of elements', () => {
      assert.equal(createNodeList('A', 'B', 'C', 'D').length, 4);
      assert.equal(createNodeList('X', 'Y', 'Z').length, 3);
      assert.equal(createNodeList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9).length, 10);
    });
  });

  describe('get node by index', () => {

    it('returns correct node', () => {

      // given
      const nodeList = new NodeList();
      const child = new Element('section');
      const anotherChild = new Element('section');

      // when
      nodeList.array_.push(child);
      nodeList.array_.push(anotherChild);

      // then
      assert.equal(nodeList[0], child);
      assert.equal(nodeList[1], anotherChild);
    });
  });

});