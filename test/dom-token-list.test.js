const DOMTokenList = require('../src/collections/dom-token-list.js');

describe('DOM Token List', () => {

  it('adds a class name', () => {

    // given
    const domTokenList = new DOMTokenList();

    // when
    domTokenList.add('test');

    // then
    assert.equal(domTokenList.length, 1);
    assert.deepEqual(Array.from(domTokenList), ['test']);
  });

  it('removes a class name', () => {

    // given
    const domTokenList = new DOMTokenList();
    domTokenList.array_.push('test');

    // when
    domTokenList.remove('test');

    // then
    assert.equal(domTokenList.length, 0);
    assert.deepEqual(Array.from(domTokenList), []);
  });

  it('toggles a class name', () => {

    // given
    const domTokenList = new DOMTokenList();

    // when
    domTokenList.toggle('test');

    // then
    assert.equal(domTokenList.length, 1);

    // when
    domTokenList.toggle('test', true);

    // then
    assert.equal(domTokenList.length, 1);

    // when
    domTokenList.toggle('test');

    // then
    assert.equal(domTokenList.length, 0);

    // when
    domTokenList.toggle('test', false);

    // then
    assert.equal(domTokenList.length, 0);
  });

  it('toggles duplicated class names', () => {

    // given
    const domTokenList = new DOMTokenList();
    domTokenList.array_.push('test');
    domTokenList.array_.push('another');
    domTokenList.array_.push('test');

    // then
    assert.equal(domTokenList.length, 3);

    // when
    domTokenList.toggle('test', false);

    // then
    assert.equal(domTokenList.length, 1);
    assert.equal(domTokenList[0], 'another');
  });
});