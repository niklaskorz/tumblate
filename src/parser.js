const EXPR = /{([\s\S]+?)}/g;
const BLOCK_START = 'block:';
const BLOCK_END = '/block:';
//const BLOCK_START_EXPR = /{block:([\s\S]+?)}/g;
//const BLOCK_END_EXPR = /{\/block:([\s\S]+?)}/g;

export class ParserError {
  constructor(message) {
    this.name = 'ParserError';
    this.message = (message || '');
  }
}

export class Parser {
  constructor() {}

  // Tokenizes a raw Tumblr template
  // Returns a list of tokens
  tokenize(template) {
    let tokens = [],
        lastIndex = 0,
        match;

    while ((match = EXPR.exec(template)) !== null) {
      if (match.index !== lastIndex) {
        tokens.push({type: 'text', value: template.slice(lastIndex, match.index)});
      }
      lastIndex = EXPR.lastIndex;

      if (match[1].startsWith(BLOCK_START)) {
        tokens.push({type: 'blockStart', value: match[1].slice(BLOCK_START.length)});
      } else if (match[1].startsWith(BLOCK_END)) {
        tokens.push({type: 'blockEnd', value: match[1].slice(BLOCK_END.length)});
      } else {
        tokens.push({type: 'var', value: match[1]}); 
      }
    }

    return tokens;
  }

  // Parses a raw Tumblr template
  // Returns an abstract syntax tree
  parse(template) {
    let tokens = this.tokenize(template),
        root = {type: 'root', children: []},
        stack = [root],
        level = 0;

    for (let token of tokens) {
      if (token.type === 'blockStart') {
        stack[++level] = {type: 'block', value: token.value, children: []};
      } else if (token.type === 'blockEnd') {
        if (stack[level].type === 'root') {
          throw new ParserError(`Tried closing block '${token.value}' while in root`);
        }
        if (token.value !== stack[level].value) {
          throw new ParserError(`Tried closing block '${token.value}' while in '${stack[level].value}'`);
        }
        stack[level - 1].children.push(stack[level]);
        stack[level--] = null;
      } else {
        stack[level].children.push(token);
      }
    }

    if (level > 0) {
      throw new ParserError(`Unclosed ${stack[level].type} '${stack[level].value}'`);
    }

    return root;
  }
}
