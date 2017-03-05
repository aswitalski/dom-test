# dom-test
A subset of DOM Level 4 model for tests in Node.js

[![Build Status](https://travis-ci.org/aswitalski/dom-test.svg?branch=master)](https://travis-ci.org/aswitalski/dom-test)
[![Coverage Status](https://coveralls.io/repos/github/aswitalski/dom-test/badge.svg)](https://coveralls.io/github/aswitalski/dom-test)
[![npm version](https://img.shields.io/npm/v/dom-test.svg?style=flat)](https://www.npmjs.com/package/dom-test)

A lightweight library for testing DOM structures in isolation.
Implemented methods and properties are specified below:

### Global document object:

| HTMLDocument |
|---|
| document.createAttribute |
| document.createComment |
| document.createElement |
| document.createTextNode |

### Node types:

| Element |
|---|
| addEventListener |
| appendChild |
| attributes |
| childElementCount |
| children |
| classList |
| className |
| contains |
| dataset |
| firstChild |
| firstElementChild |
| getAttribute |
| hasChildNodes |
| insertBefore |
| lastChild |
| lastElementChild |
| nodeName |
| nodeType |
| parentElement|
| parentNode |
| removeAttribute |
| removeEventListener |
| setAttribute |
| style |
| replaceChild |
| removeChild |
| tagName |

| Comment |
|---|
| nodeName |
| nodeType |
| parentElement|
| parentNode |
| textContent |

| Text |
|---|
| nodeName |
| nodeType |
| parentElement|
| parentNode |
| textContent |

### Element child nodes:

| NodeList |
|---|
| entries |
| forEach |
| keys |
| length |
| values |
| *( get node by index )* |
| *( iterate )* |

### Element children:

| HTMLCollection |
|---|
| item |
| length |
| *( get element by index )* |

### Element style:

| CSSStyleDeclaration |
|---|
| getPropertyValue |
| item |
| length |
| removeProperty |
| setProperty |
| *( get style by index )* |

### Element class list:

| DOMTokenList |
|---|
| add |
| contains |
| forEach |
| keys |
| length |
| remove |
| toggle |
| values |
| *( iterate )* |
| *( get token by index )* |

### Element dataset:

| DOMStringMap |
|---|
| *( get property by name )* | 
| *( set property by name )* | 

### Element attributes:

| NamedNodeMap |
|---|
| getNamedItem |
| removeNamedItem |
| setNamedItem |
| item |
| length |
| *( get attribute by name )* |
| *( get attribute by index )* |

### Attribute instance:

| Attr |
|---|
| name |
| value |
