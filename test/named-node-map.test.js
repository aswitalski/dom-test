const NamedNodeMap = require('../src/collections/named-node-map.js');

describe('Named Node Map', () => {

  const createAttr = (name, value) => {
    const attr = new Attr(name);
    attr.value = value;
    return attr;
  };

  describe('length', () => {

    it('returns number of attributes', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const idAttr = createAttr('id', 'id');
      const valueAttr = createAttr('value', 666);

      // when
      namedNodeMap.setNamedItem(idAttr);
      namedNodeMap.setNamedItem(valueAttr);

      // then
      assert.equal(namedNodeMap.length, 2);
    });

    it('returns zero for new instance', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      // then
      assert.equal(namedNodeMap.length, 0);
    });
  });

  describe('item', () => {

    it('returns attributes by index', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const idAttr = createAttr('id', 'id');
      const valueAttr = createAttr('value', 666);

      namedNodeMap.setNamedItem(idAttr);
      namedNodeMap.setNamedItem(valueAttr);

      // then
      assert.equal(namedNodeMap.item(0), idAttr);
      assert.equal(namedNodeMap.item(1), valueAttr);
    });

    it('returns null if index not in range', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      // then
      assert.equal(namedNodeMap.item(100), null);
    });
  });

  describe('get attribute by index', () => {

    it('returns attributes by index', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const exampleAttr = createAttr('example', 'example');
      const anotherAttribute = createAttr('xxx', 'yyy');

      namedNodeMap.setNamedItem(exampleAttr);
      namedNodeMap.setNamedItem(anotherAttribute);

      // then
      assert.equal(namedNodeMap[0], exampleAttr);
      assert.equal(namedNodeMap[1], anotherAttribute);
    });

    it('returns undefined if index not in range', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      // then
      assert.equal(namedNodeMap[0], undefined);
    });

    it('supports symbol property', () => {

      // given
      const symbol = Symbol.for('present');
      const namedNodeMap = new NamedNodeMap();
      namedNodeMap[symbol] = 'exists';

      // then
      assert.equal(namedNodeMap[symbol], 'exists');
      assert.equal(namedNodeMap[Symbol.for('absent')], undefined);
    });
  });

  describe('get attribute value by name', () => {

    it('returns attribute values by name', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const idAttr = createAttr('id', 'id');
      const valueAttr = createAttr('value', 666);

      // when
      namedNodeMap.setNamedItem(idAttr);
      namedNodeMap.setNamedItem(valueAttr);

      // then
      assert.equal(namedNodeMap.length, 2);
      assert.equal(namedNodeMap.id, idAttr);
      assert.equal(namedNodeMap.value, valueAttr);
    });

    it('returns undefined if attribute does not exist', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      // then
      assert.equal(namedNodeMap.invalid, undefined);
    });
  });

  describe('get named item', () => {

    it('returns attributes by name', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const idAttr = createAttr('id', 'id');
      const valueAttr = createAttr('value', 666);

      // when
      namedNodeMap.setNamedItem(idAttr);
      namedNodeMap.setNamedItem(valueAttr);

      // then
      assert.equal(namedNodeMap.length, 2);
      assert.equal(namedNodeMap.getNamedItem('id'), idAttr);
      assert.equal(namedNodeMap.getNamedItem('value'), valueAttr);
    });

    it('returns null if attribute not found', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      // then
      assert.equal(namedNodeMap.getNamedItem('id'), null);
    });
  });

  describe('set named item', () => {

    it('adds new attribute', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const idAttr = createAttr('id', 'some-id');
      const nameAttr = createAttr('name', 'some-name');
      const valueAttr = createAttr('value', 666);

      // when
      namedNodeMap.setNamedItem(idAttr);
      namedNodeMap.setNamedItem(nameAttr);
      namedNodeMap.setNamedItem(valueAttr);

      // then
      assert.equal(namedNodeMap.map_.size, 3);
      assert.equal(namedNodeMap.map_.get('id'), idAttr);
      assert.equal(namedNodeMap.map_.get('name'), nameAttr);
      assert.equal(namedNodeMap.map_.get('value'), valueAttr);
    });

    it('replaces attribute', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const idAttr = createAttr('id', 'some-id');
      const nameAttr = createAttr('name', 'some-name');
      const valueAttr = createAttr('value', 666);

      const idAttr2 = createAttr('id', 'some-id-2');
      const nameAttr2 = createAttr('name', 'some-name-2');
      const valueAttr2 = createAttr('value', 999);

      namedNodeMap.setNamedItem(idAttr);
      namedNodeMap.setNamedItem(nameAttr);
      namedNodeMap.setNamedItem(valueAttr);

      // when
      assert.equal(namedNodeMap.setNamedItem(idAttr2), idAttr);
      assert.equal(namedNodeMap.setNamedItem(nameAttr2), nameAttr);
      assert.equal(namedNodeMap.setNamedItem(valueAttr2), valueAttr);

      // then
      assert.equal(namedNodeMap.map_.size, 3);
      assert.equal(namedNodeMap.map_.get(idAttr.name), idAttr2);
      assert.equal(namedNodeMap.map_.get(nameAttr.name), nameAttr2);
      assert.equal(namedNodeMap.map_.get(valueAttr.name), valueAttr2);
    });
  });

  describe('remove named item', () => {

    it('removes existing attribute', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      const idAttr = createAttr('id', 'some-id');
      const nameAttr = createAttr('name', 'some-name');
      const valueAttr = createAttr('value', 666);
      namedNodeMap.setNamedItem(idAttr);
      namedNodeMap.setNamedItem(nameAttr);
      namedNodeMap.setNamedItem(valueAttr);

      // when
      assert.equal(namedNodeMap.removeNamedItem(idAttr.name), idAttr);
      assert.equal(namedNodeMap.removeNamedItem(nameAttr.name), nameAttr);
      assert.equal(namedNodeMap.removeNamedItem(valueAttr.name), valueAttr);

      // then
      assert.equal(namedNodeMap.map_.size, 0);
    });

    it('throws an error if attribute not found', () => {

      // given
      const namedNodeMap = new NamedNodeMap();

      // then
      assert.throws(() => {
        namedNodeMap.removeNamedItem('invalid');
      }, /Failed to execute 'removeNamedItem'.*/);
    });
  });
});
