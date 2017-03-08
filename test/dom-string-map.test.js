const dataset = require('../src/collections/dom-string-map.js');
const NamedNodeMap = require('../src/collections/named-node-map.js');

describe('DOM String Map', () => {

  let attributes;

  const createDOMStringMap = () => {
    attributes = new NamedNodeMap();
    return new dataset(attributes);
  };

  it('sets the string value', () => {

    // given
    const dataset = createDOMStringMap();

    // when
    dataset.undefined = undefined;
    dataset.null = null;
    dataset.boolean = true;
    dataset.number = 5;
    dataset.string = 'string';

    // then
    assert.equal(dataset.map_.get('undefined'), 'undefined');
    assert.equal(dataset.map_.get('null'), 'null');
    assert.equal(dataset.map_.get('boolean'), 'true');
    assert.equal(dataset.map_.get('number'), '5');
    assert.equal(dataset.map_.get('string'), 'string');

    assert.equal(dataset.length_, 5);
  });

  it('returns property names as own keys', () => {

    // given
    const dataset = createDOMStringMap();
    dataset.test = 'test';
    dataset.key = 'value';

    // when
    const keys = Object.keys(dataset);

    // then
    assert.equal(keys.length, 2);
  });

  it('allows to iterate through properties', () => {

    // given
    const dataset = createDOMStringMap();
    dataset.test = 'test';
    dataset.key = 'value';

    // when
    const keys = [];
    for (const key in dataset) {
      keys.push(key);
    }

    // then
    assert.equal(keys.length, 2);
  });

  it('returns valid property descriptor', () => {

    // given
    const dataset = createDOMStringMap();
    dataset.key = 'value';

    // when
    const descriptor = Object.getOwnPropertyDescriptor(dataset, 'key');

    // then
    assert.deepEqual(descriptor, {
      value: 'value',
      writable: true,
      enumerable: true,
      configurable: true
    });
  });

  it('sets the prefixed attribute', () => {

    // given
    const dataset = createDOMStringMap();

    // when
    dataset.customName = 'custom value';

    // then
    const attr = attributes.getNamedItem('data-custom-name');
    assert.equal(attr.name, 'data-custom-name');
    assert.equal(attr.value, 'custom value');
    assert.equal(dataset.attributes_, attributes);
  });

  it('deletes the prefixed attribute', () => {

    // given
    const dataset = createDOMStringMap();
    dataset.customName = 'custom value';

    // then
    assert(attributes.getNamedItem('data-custom-name'));
    assert.equal(attributes.length, 1);

    // when
    delete dataset.customName;

    // then
    assert.equal(attributes.getNamedItem('data-custom-name'), null);
    assert.equal(attributes.length, 0);
  });

  it('throws an exception for symbol value', () => {

    // given
    const dataset = createDOMStringMap();

    // then
    assert.throws(() => {
      dataset.invalid = Symbol.for('invalid');
    }, /Cannot convert a Symbol value to a string/);
  });
});
