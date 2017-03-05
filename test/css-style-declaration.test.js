const CSSStyleDeclaration = require('../src/collections/css-style-declaration.js');

describe('CSS Style Declaration', () => {

  describe('set property', () => {

    it('ignores unknown property name', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.setProperty('unknown', 'value');
      style.setProperty('backgroundColor', 'red');

      // then
      assert.equal(style.length, 0);
    });

    it('supports knows property name', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.setProperty('background-color', 'black');
      style.setProperty('color', 'white');

      // then
      assert.equal(style.length, 2);
      assert.equal(style.map_.get('background-color'), 'black');
      assert.equal(style.map_.get('color'), 'white');
    });
  });

  describe('get property value', () => {

    it('returns the property value', () => {

      // given
      const style = new CSSStyleDeclaration();
      style.map_.set('color', 'green');

      // then
      assert.equal(style.getPropertyValue('color'), 'green');
    });

    it('returns empty string for unknown property', () => {
      // given

      const style = new CSSStyleDeclaration();

      // then
      assert.equal(style.getPropertyValue('text'), '');
    });
  });

  describe('remove property', () => {

    it('removes property and returns its value', () => {

      // given
      const style = new CSSStyleDeclaration();
      style.map_.set('font-size', 'inherit');

      // then
      const result = style.removeProperty('font-size');

      // then
      assert.equal(result, 'inherit');
      assert.equal(style.getPropertyValue('font-size'), '');
      assert.equal(style.length, 0);
    });

    it('returns empty string for unknown property', () => {

      // given
      const style = new CSSStyleDeclaration();

      // then
      assert.equal(style.removeProperty('unknown'), '');
    });
  });

  describe('set css text', () => {

    it('sets multiple style properties', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.cssText = 'color: red; font-size: 10px; font-family: arial;';

      // then
      assert.equal(style.length, 3);
      assert.equal(style.map_.get('color'), 'red');
      assert.equal(style.map_.get('font-size'), '10px');
      assert.equal(style.map_.get('font-family'), 'arial');
    });

    it('ignores unknown properties', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.cssText = 'unknown: property; color: black; another: property';

      // then
      assert.equal(style.length, 1);
      assert.equal(style.map_.get('color'), 'black');
    });
  });

  describe('get css text', () => {

    it('returns all properties', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.setProperty('background-color', 'black');
      style.setProperty('color', 'white');

      // then
      assert.equal(style.cssText, 'background-color: black; color: white;');
    });
  });

  describe('item', () => {

    it('returns property names by index', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.setProperty('background-color', 'black');
      style.setProperty('color', 'white');

      // then
      assert.equal(style.item(0), 'background-color');
      assert.equal(style.item(1), 'color');
    });
  });

  describe('length', () => {

    it('returns number of style properties', () => {

      // given
      const style = new CSSStyleDeclaration();

      // then
      assert.equal(style.length, 0);

      // when
      style.setProperty('background-color', 'black');
      style.setProperty('color', 'white');

      // then
      assert.equal(style.length, 2);
    });
  });

  describe('get style by index', () => {

    it('returns property names', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.setProperty('font-size', '2rem');
      style.setProperty('color', 'white');

      // then
      assert.equal(style[0], 'font-size');
      assert.equal(style[1], 'color');
    });
  });

  describe('get style by name', () => {

    it('returns property values', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.setProperty('font-size', '2rem');
      style.setProperty('color', 'white');

      // then
      assert.equal(style.fontSize, '2rem');
      assert.equal(style.color, 'white');
    });
  });

  describe('set style by name', () => {

    it('sets property values', () => {

      // given
      const style = new CSSStyleDeclaration();

      // when
      style.width = '800px';
      style.height = '600px';

      // then
      assert.equal(style.getPropertyValue('width'), '800px');
      assert.equal(style.getPropertyValue('height'), '600px');
    });
  });
});