const EXPR = /{([\s\S]+?)}/g;
const BLOCK_START = 'block:';
const BLOCK_END = '/block:';
//const BLOCK_START_EXPR = /{block:([\s\S]+?)}/g;
//const BLOCK_END_EXPR = /{\/block:([\s\S]+?)}/g;

export default class Parser {
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
  // Returns an AST
  parse(template) {
      
  }
}
