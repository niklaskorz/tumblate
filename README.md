# Tumblate [![Build Status](https://travis-ci.org/niklaskorz/tumblate.svg?branch=master)](https://travis-ci.org/niklaskorz/tumblate)

A tumblr template rendering library.
Written in ES2015 and without dependencies.

## Why would I need this?

You probably don't. Unless you're working on development tools for tumblr template development, like me.

## Installation

Tumblate is available on npm. Just run:

    npm install --save tumblate

## Examples

There are two ways to get started, either by creating a reusable instance of
the `Template` class or by using the `render` function.

```js
templateSrc = 'Welcome to {Title}.{block:Description} It is about: {Description}{/block:Description} Have a nice day!'
data = {
  Title: 'My Blog',
  Description: 'Nothing special. Just random things.'
}

// ES2015
import {Template, render} from 'tumblate';

let template = new Template(templateSrc);
console.log(template.render(data));

console.log(render(templateSrc, data));

// CommonJS
var tumblate = require('tumblate');

var template = new tumblate.Template(templateSrc);
console.log(template.render(data));

console.log(tumblate.render(templateSrc, data));
```

## Missing features

Tumblate is currently missing meta variables (i.e., user-definable variables like `{color:Content Background}`)
and parameters (e.g., `{Likes limit="5" summarize="100" width="150"}`).
