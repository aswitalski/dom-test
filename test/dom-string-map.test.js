const DOMStringMap = require('../src/collections/dom-string-map.js');
const NamedNodeMap = require('../src/collections/named-node-map.js');

describe('DOM String Map', () => {

  let attributes;

  const createDOMStringMap = () => {
    attributes = new NamedNodeMap();
    return new DOMStringMap(attributes);
  };

  it('sets the string value', () => {

    // given
    const domStringMap = createDOMStringMap();

    // when
    domStringMap.undefined = undefined;
    domStringMap.null = null;
    domStringMap.boolean = true;
    domStringMap.number = 5;
    domStringMap.string = 'string';

    // then
    assert.equal(domStringMap.map_.get('undefined'), 'undefined');
    assert.equal(domStringMap.map_.get('null'), 'null');
    assert.equal(domStringMap.map_.get('boolean'), 'true');
    assert.equal(domStringMap.map_.get('number'), '5');
    assert.equal(domStringMap.map_.get('string'), 'string');
  });

  it('sets the prefixed attribute', () => {

    // given
    const domStringMap = createDOMStringMap();

    // when
    domStringMap.customName = 'custom value';

    // then
    const attr = attributes.getNamedItem('data-custom-name');
    assert.equal(attr.name, 'data-custom-name');
    assert.equal(attr.value, 'custom value');
    assert.equal(domStringMap.attributes_, attributes);
  });

  it('deletes the prefixed attribute', () => {

    // given
    const domStringMap = createDOMStringMap();
    domStringMap.customName = 'custom value';

    // then
    assert(attributes.getNamedItem('data-custom-name'));
    assert.equal(attributes.length, 1);

    // when
    delete domStringMap.customName;

    // then
    assert.equal(attributes.getNamedItem('data-custom-name'), null);
    assert.equal(attributes.length, 0);
  });

  it('throws an exception for symbol value', () => {

    // given
    const domStringMap = createDOMStringMap();

    // then
    assert.throws(() => {
      domStringMap.invalid = Symbol.for('invalid');
    }, /Cannot convert a Symbol value to a string/);
  });
});