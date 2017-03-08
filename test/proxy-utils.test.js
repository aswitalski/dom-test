const ProxyUtils = require('../src/utils/proxy-utils.js')

describe('Proxy Utils', () => {

  const createTarget = (...entries) => {
    const map = new Map();
    entries.forEach(([key, value]) => {
      map.set(key, value);
    });
    return {
      map_: map,
    };
  }

  describe('get map keys', () => {

    it('returns keys of map elements', () => {

      // given
      const target = createTarget(['key', 'value']);

      // when
      const keys = ProxyUtils.getMapKeys(target);

      // then
      assert.deepEqual(keys, ['key']);
    });
  });

  describe('has key in map', () => {

    it('returns true for existing key', () => {

      // given
      const target = createTarget(['key', 'value']);

      // then
      assert.equal(ProxyUtils.hasKeyInMap(target, 'key'), true);
      assert.equal(ProxyUtils.hasKeyInMap(target, 'invalid'), false);
    });
  });

  describe('get map property descriptor', () => {

    it('returns valid property descriptor for existing key', () => {

      // given
      const target = createTarget(['key', 'value']);

      // then
      assert.deepEqual(ProxyUtils.getMapPropertyDescriptor(target, 'key'), {
        value: 'value',
        writable: true,
        configurable: true,
        enumerable: true,
      });
    });

    it('returns undefined for non-existing key', () => {

      // given
      const target = createTarget(['key', 'value']);

      // then
      assert.equal(
        ProxyUtils.getMapPropertyDescriptor(target, 'invalid'), undefined);
    });
  });
});
