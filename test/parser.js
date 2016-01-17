import assert from 'assert';

import Parser from '../src/parser';

const template = 'This is a {block:blockExpr}{value}{/block:blockExpr} and a {block:someVar}conditional{/block:someVar}';
const tokens = [{
  type: 'text',
  value: 'This is a ',
}, {
  type: 'blockStart',
  value: 'blockExpr',
}, {
  type: 'var',
  value: 'value',
}, {
  type: 'blockEnd',
  value: 'blockExpr',
}, {
  type: 'text',
  value: ' and a ',
}, {
  type: 'blockStart',
  value: 'someVar',
}, {
  type: 'text',
  value: 'conditional',
}, {
  type: 'blockEnd',
  value: 'someVar',
}];

describe('Parser', () => {
  it('should tokenize a template correctly', done => {
    let parser = new Parser;
    const result = parser.tokenize(template);
    assert.deepEqual(tokens, result);
    done();
  });
});
