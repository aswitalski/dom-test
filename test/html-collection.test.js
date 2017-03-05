require('../src/document.js');
const HTMLCollection = require('../src/collections/html-collection.js');

describe('HTML Collection', () => {

  describe('item', () => {

    it('returns items which are Elements', () => {

      // given
      const divElement = new Element('div');
      const spanElement = new Element('span');
      const items = [
        new Text('text'),
        divElement,
        new Comment('comment'),
      ];
      const collection = new HTMLCollection(items);

      // then
      assert.equal(collection.item(0), divElement);

      // when
      items.push(new Text('another text'));
      items.push(spanElement);

      // then
      assert.equal(collection.item(1), spanElement);
    })
  });

  describe('length', () => {

    it('returns number of items which are Elements', () => {

      // given
      const items = [
        new Element('div'),
        new Text('text'),
        new Comment('comment'),
        new Element('span'),
      ];
      const collection = new HTMLCollection(items);

      // then
      assert.equal(collection.length, 2);

      // when
      items.push(new Element('p'));
      items.push(new Text('another text'));

      // then
      assert.equal(collection.length, 3);
    })
  });

  describe('get element by index', () => {

    it('returns correct elements', () => {

      // given
      const nodes = [];
      const htmlCollection = new HTMLCollection(nodes);
      const spanElement = new Element('span');
      const linkElement = new Element('a');

      // when
      nodes.push(new Text('value'));
      nodes.push(linkElement);
      nodes.push(new Comment('comment'));
      nodes.push(spanElement);
      nodes.push(new Text('text'));

      // then
      assert.equal(htmlCollection[0], linkElement);
      assert.equal(htmlCollection[1], spanElement);
    });
  });

});