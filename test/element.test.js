require('../src/document.js');

describe('Element', () => {

  const createElement = (...childNames) => {
    const element = new Element('article');
    childNames.forEach(childName => {
      const childNode = new Element(childName);
      element.appendChild(childNode);
    });
    return element;
  };

  it('returns tag name as node name', () => {

    // given
    const element = document.createElement('div');

    // then
    assert.equal(element.nodeName, 'DIV');
  });

  it('returns ELEMENT_NODE as node type', () => {

    // given
    const divElement = document.createElement('div');

    // then
    assert.equal(divElement.nodeType, Node.ELEMENT_NODE);
  });

  describe('append child', () => {

    it('adds child nodes', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');

      // when
      element.appendChild(child);

      // then
      assert.equal(element.childNodes.length, 1);
      assert.equal(element.childNodes.array_[0], child);

      assert.equal(child.parentNode, element);

      // given
      const anotherChild = new Element('section');

      // when
      element.appendChild(anotherChild);

      // then
      assert.equal(element.childNodes.length, 2);
      assert.equal(element.childNodes.array_[0], child);
      assert.equal(element.childNodes.array_[1], anotherChild);

      assert.equal(anotherChild.parentNode, element);
    });

    it('rejects invalid child', () => {
      assert.throws(() => {
        new Element('div').appendChild('span');
      }, /Failed .* 'appendChild' .* parameter 1 .*/);
    });
  });

  describe('has child nodes', () => {

    it('returns true for any child nodes', () => {
      assert.equal(createElement('span').hasChildNodes(), true);
      assert.equal(createElement('div', 'span').hasChildNodes(), true);
      assert.equal(createElement('p', 'div', 'span').hasChildNodes(), true);
    });

    it('returns false for no child nodes', () => {
      assert.equal(createElement().hasChildNodes(), false);
    });
  });

  describe('contains', () => {

    it('returns true for child element', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const anotherChild = new Element('section');

      // when
      element.appendChild(child);
      element.appendChild(anotherChild);

      // then
      assert.equal(element.contains(child), true);
      assert.equal(element.contains(anotherChild), true);
    });

    it('returns false for other elements', () => {

      // given
      const element = new Element('article');
      const node = new Element('section');

      // then
      assert.equal(element.contains(node), false);
    });

    it('rejects invalid child', () => {
      assert.throws(() => {
        new Element('div').contains('span');
      }, /Failed .* 'contains' .* parameter 1 .*/);
    });
  });

  describe('first child', () => {

    it('returns first child node', () => {

      // given
      const element = new Element('article');
      const firstChild = new Element('section');
      const lastChild = new Element('section');

      // when
      element.appendChild(firstChild);
      element.appendChild(lastChild);

      // then
      assert.equal(element.firstChild, firstChild);
    });

    it('returns null for no child nodes', () => {

      // given
      const element = new Element('article');

      // then
      assert.equal(element.firstChild, null);
    });
  });

  describe('last child', () => {

    it('returns last child node', () => {

      // given
      const element = new Element('article');
      const firstChild = new Element('section');
      const lastChild = new Element('section');

      // when
      element.appendChild(firstChild);
      element.appendChild(lastChild);

      // then
      assert.equal(element.lastChild, lastChild);
    });

    it('returns null for no child nodes', () => {

      // given
      const element = new Element('article');

      // then
      assert.equal(element.lastChild, null);
    });
  });

  describe('insert before', () => {

    it('inserts new node before specified child node', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const anotherChild = new Element('section');
      element.appendChild(child);

      // when
      element.insertBefore(anotherChild, child);

      // then
      assert.equal(element.childNodes[0], anotherChild);
      assert.equal(element.childNodes[1], child);

      assert.equal(anotherChild.parentNode, element);
    });

    it('appends new node when no sibling is specified', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const anotherChild = new Element('section');
      element.appendChild(child);

      // when
      element.insertBefore(anotherChild, null);

      // then
      assert.equal(element.childNodes[0], child);
      assert.equal(element.childNodes[1], anotherChild);

      assert.equal(anotherChild.parentNode, element);
    });

    it('throws an error for node not being child of the element', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const anotherChild = new Element('section');
      const someNode = new Element('div');
      element.appendChild(child);

      // when
      assert.throws(() => {
        element.insertBefore(anotherChild, someNode);
      }, /The node .* is not a child of this node/);
    });

    it('rejects invalid new child', () => {
      assert.throws(() => {
        new Element('div').insertBefore('span', new Element('span'));
      }, /Failed .* 'insertBefore' .* parameter 1 .*/);
    });

    it('rejects invalid sibling', () => {
      assert.throws(() => {
        new Element('div').insertBefore(new Element('span'), 'span');
      }, /Failed .* 'insertBefore' .* parameter 2 .*/);
    });
  });

  describe('replace child', () => {

    it('replaces child node with the new one', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const anotherChild = new Element('section');
      element.appendChild(child);

      // when
      element.replaceChild(anotherChild, child);

      // then
      assert.equal(element.childNodes.length, 1);
      assert.equal(element.childNodes[0], anotherChild);

      assert.equal(child.parentNode, null);
      assert.equal(anotherChild.parentNode, element);
    });

    it('throws an error for node not being child of the element', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const anotherChild = new Element('section');
      const someNode = new Element('div');
      element.appendChild(child);

      // when
      assert.throws(() => {
        element.replaceChild(anotherChild, someNode);
      }, /The node to be replaced is not a child of this node/);
    });

    it('rejects invalid new child', () => {
      assert.throws(() => {
        new Element('div').replaceChild('span', new Element('span'));
      }, /Failed .* 'replaceChild' .* parameter 1 .*/);
    });

    it('rejects invalid node to be replaced', () => {
      assert.throws(() => {
        new Element('div').replaceChild(new Element('span'), 'span');
      }, /Failed .* 'replaceChild' .* parameter 2 .*/);
    });
  });

  describe('remove child', () => {

    it('removes child node', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      element.appendChild(child);

      // when
      element.removeChild(child);

      // then
      assert.equal(element.childNodes.length, 0);
      assert.equal(child.parentNode, null);
    });

    it('throws an error for node not being child of the element', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const someNode = new Element('div');
      element.appendChild(child);

      // when
      assert.throws(() => {
        element.removeChild(someNode);
      }, /The node to be removed is not a child of this node/);
    });

    it('rejects invalid child', () => {
      assert.throws(() => {
        new Element('div').removeChild('span');
      }, /Failed .* 'removeChild' .* parameter 1 .*/);
    });
  });

  describe('get child node by index', () => {

    it('returns correct child node', () => {

      // given
      const element = new Element('article');
      const child = new Element('section');
      const anotherChild = new Element('section');

      // when
      element.appendChild(child);
      element.appendChild(anotherChild);

      // then
      assert.equal(element.childNodes[0], child);
      assert.equal(element.childNodes[1], anotherChild);
    });
  });

  describe('children', () => {

    it('returns only elements', () => {

      // given
      const element = new Element('div');
      const spanElement = new Element('span');
      const linkElement = new Element('a');

      // when
      element.appendChild(new Text('value'));
      element.appendChild(spanElement);
      element.appendChild(linkElement);
      element.appendChild(new Comment('comment'));
      element.appendChild(new Text('text'));

      // then
      assert.equal(element.children.length, 2);
      assert.equal(element.children[0], spanElement);
      assert.equal(element.children[1], linkElement);
    });
  });

  describe('first element child', () => {

    it('returns null for no child elements', () => {

      // given
      const element = new Element('div');

      // then
      assert.equal(element.firstElementChild, null);

      // when
      element.appendChild(new Text('text'));
      element.appendChild(new Comment('comment'));

      // then
      assert.equal(element.firstElementChild, null);
    });

    it('returns first element child', () => {

      // given
      const element = new Element('div');
      const spanElement = new Element('span');

      // when
      element.appendChild(new Text('text'));
      element.appendChild(new Comment('comment'));
      element.appendChild(spanElement);

      // then
      assert.equal(element.firstElementChild, spanElement);
    });
  });

  describe('last element child', () => {

    it('returns null for no element children', () => {

      // given
      const element = new Element('div');

      // then
      assert.equal(element.lastElementChild, null);

      // when
      element.appendChild(new Text('text'));
      element.appendChild(new Comment('comment'));

      // then
      assert.equal(element.lastElementChild, null);
    });

    it('returns last element child', () => {

      // given
      const element = new Element('div');
      const linkElement = new Element('a');

      // when
      element.appendChild(new Element('span'));
      element.appendChild(new Text('text'));
      element.appendChild(linkElement);
      element.appendChild(new Comment('comment'));

      // then
      assert.equal(element.lastElementChild, linkElement);
    });
  });

  describe('child element count', () => {

    it('returns number of element children', () => {

      // given
      const element = new Element('div');

      // when
      element.appendChild(new Element('span'));
      element.appendChild(new Text('text'));
      element.appendChild(new Comment('comment'));

      // then
      assert.equal(element.childElementCount, 1);
    });
  });

  describe('dataset', () => {

    it('adds a data attribute', () => {

      // given
      const element = document.createElement('span');

      // when
      element.dataset.someName = 666;

      // then
      assert.equal(element.dataset['someName'], '666')
      assert.equal(element.getAttribute('data-some-name'), '666');
      assert.equal(element.attributes.length, 1);
    });

    it('replaces a data attribute', () => {

      // given
      const element = document.createElement('span');
      element.dataset.reactorId = 'id';

      assert.equal(element.dataset['reactorId'], 'id')
      assert.equal(element.getAttribute('data-reactor-id'), 'id');
      assert.equal(element.attributes.length, 1);

      // when
      element.dataset.reactorId = true;

      // then
      assert.equal(element.dataset['reactorId'], 'true')
      assert.equal(element.getAttribute('data-reactor-id'), 'true');
      assert.equal(element.attributes.length, 1);
    });

    it('removes a data attribute', () => {

      // given
      const element = document.createElement('span');
      element.dataset.attr = 'value';

      assert.equal(element.dataset['attr'], 'value')
      assert.equal(element.getAttribute('data-attr'), 'value');

      // when
      delete element.dataset.attr;

      // then
      assert.equal(element.dataset['attr'], undefined)
      assert.equal(element.getAttribute('data-reactor-id'), undefined);
      assert.equal(element.attributes.length, 0);
    });
  });

  describe('set attribute', () => {

    it('adds an attribute', () => {

      // given
      const element = document.createElement('span');

      // when
      element.setAttribute('test', null);

      // then
      assert.equal(element.attributes.test.value, 'null')
      assert.equal(element.getAttribute('test'), 'null');
    });

    it('replaces an attribute', () => {

      // given
      const element = document.createElement('span');
      element.setAttribute('test', undefined);

      assert.equal(element.attributes.test.value, 'undefined')

      // when
      element.setAttribute('test', true);

      // then
      assert.equal(element.attributes.test.value, 'true')
      assert.equal(element.getAttribute('test'), 'true');
    });
  });

  describe('remove attribute', () => {

    it('removes an attribute', () => {

      // given
      const element = document.createElement('span');
      element.setAttribute('id', 'valid-id');

      assert.equal(element.attributes.id.value, 'valid-id')

      // when
      element.removeAttribute('id');

      // then
      assert.equal(element.attributes.id, undefined);
      assert.equal(element.getAttribute('id'), undefined);
    });
  });

  describe('add event listener', () => {

    it('adds a single event listener', () => {

      // given
      const element = document.createElement('a');
      const listener = () => {};

      // when
      element.addEventListener('click', listener);

      // then
      assert.deepEqual(element.eventListeners_, {
        click: [listener],
      });
    });

    it('adds multiple event listeners', () => {

      // given
      const element = document.createElement('a');
      const firstListener = () => {};
      const secondListener = () => {};

      // when
      element.addEventListener('change', firstListener);
      element.addEventListener('change', secondListener);

      // then
      assert.deepEqual(element.eventListeners_, {
        change: [firstListener, secondListener],
      });
    });
  });

  describe('remove event listener', () => {

    it('removes a single event listener', () => {

      // given
      const element = document.createElement('a');
      const listener = () => {};
      element.addEventListener('drag', listener);

      // when
      element.removeEventListener('drag', listener);

      // then
      assert.deepEqual(element.eventListeners_, {
        drag: [],
      });
    });

    it('removes multiple event listeners', () => {

      // given
      const element = document.createElement('a');
      const firstListener = () => {};
      const secondListener = () => {};
      element.addEventListener('drop', firstListener);
      element.addEventListener('drop', secondListener);

      // when
      element.removeEventListener('drop', firstListener);
      element.removeEventListener('drop', secondListener);

      // then
      assert.deepEqual(element.eventListeners_, {
        drop: []
      })
    });
  });

  describe('set class name', () => {

    it('sets class list items', () => {

      // given
      const element = document.createElement('div');

      // when
      element.className = 'c1 c2 c3';

      // then
      assert.equal(element.classList.length, 3);
      assert.equal(element.classList[0], 'c1');
      assert.equal(element.classList[1], 'c2');
      assert.equal(element.classList[2], 'c3');
    });
  });

  describe('get class name', () => {

    it('returns text representation of class list items', () => {

      // given
      const element = document.createElement('div');

      // when
      element.classList.add('c1');
      element.classList.add('c2');
      element.classList.add('c3');

      // then
      assert.equal(element.className, 'c1 c2 c3');
    });
  });
});