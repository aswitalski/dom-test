require('../src/document.js');

describe('Attr', () => {

  it('has empty string value by default', () => {

    // given
    const attr = document.createAttribute('name');

    // then
    assert.equal(attr.name, 'name');
    assert.equal(attr.value, '');
  });

  it('converts given value to a string', () => {

    // given
    const attr = document.createAttribute('value');

    // when
    attr.value = 5;

    // then
    assert.equal(attr.name, 'value');
    assert.equal(attr.value, '5');
  });

  it('allows to set an arbitrary property', () => {

    // given
    const attr = document.createAttribute('value');

    // when
    attr.anything = 666;

    // then
    assert.equal(attr.name, 'value');
    assert.equal(attr.anything, 666);
  });
});