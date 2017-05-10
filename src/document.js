global.Node = require('./nodes/node.js');

global.Attr = require('./nodes/attr.js');
global.Comment = require('./nodes/comment.js');
global.Element = require('./nodes/element.js');
global.Text = require('./nodes/text.js');

global.document = class HTMLDocument {

  static createElement(name) {
    return new Element(name);
  }

  static createComment(text) {
    return new Comment(text);
  }

  static createAttribute(name) {
    return new Attr(name);
  }

  static createTextNode(text) {
    return new Text(text);
  }
};

document.documentElement = document.createElement('html');
document.body = document.createElement('body');
