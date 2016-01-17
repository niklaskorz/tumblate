import assert from 'assert';

import {Parser, ParserError} from '../src/parser';

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
const ast = {
  type: 'root',
  children: [{
    type: 'text',
    value: 'This is a ',
  }, {
    type: 'block',
    value: 'blockExpr',
    children: [{
      type: 'var',
      value: 'value',
    }],
  }, {
    type: 'text',
    value: ' and a ',
  }, {
    type: 'block',
    value: 'someVar',
    children: [{
      type: 'text',
      value: 'conditional',
    }],
  }],
};

describe('Parser', () => {
  let parser = new Parser;
  it('should tokenize a template correctly', done => {
    const result = parser.tokenize(template);
    assert.deepEqual(result, tokens);
    done();
  });
  it('should parse a template correctly', done => {
    const result = parser.parse(template);
    assert.deepEqual(result, ast);
    done();
  });
  it('should fail parsing mismatching block start and end tags', done => {
    const template = 'This {block:mis}is a mismatch{/block:match}';
    assert.throws(() => parser.parse(template), ParserError, "Tried closing block 'match' while in 'mis'");
    done();
  });
  it('should fail parsing a block end before a block start', done => {
    const template = 'This {/block:misses} a block start';
    assert.throws(() => parser.parse(template), ParserError, "Tried closing block 'misses' while in root");
    done();
  });
  it('should fail parsing a missing block end', done => {
    const template = 'This {block:misses} a block end';
    assert.throws(() => parser.parse(template), ParserError, "Unclosed block 'misses'");
    done();
  });
});
