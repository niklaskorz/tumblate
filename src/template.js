import {Parser} from './parser';

let parser = new Parser;

function getProperty(scope, name) {
  for (let i = scope.length - 1; i >= 0; --i) {
    if (scope && scope[i].hasOwnProperty(name)) {
      return scope[i][name];
    }
  }
  return null;
}

export class Template {
  constructor(template) {
    this.root = parser.parse(template);
  }

  render(data) {
    let result = '',
        stack = [this.root],
        scope = [data],
        indices = [0],
        level = 0;

    while (level > 0 || indices[0] < stack[0].children.length) {
      if (indices[level] >= stack[level].children.length) {
        scope.pop();
        indices.pop();
        stack.pop();
        level -= 1;
        continue;
      }
      
      let node = stack[level].children[indices[level]++];
      if (node.type === 'text') {
        result += node.value;
      } else {
        let value = getProperty(scope, node.value);
        if (node.type === 'block' && value) {
          level += 1;
          stack.push(node);
          indices.push(0)
          scope.push((value instanceof Object) ? value : {});
        } else if (node.type === 'var') {
          result += value;
        }
      }
    }
    
    return result;
  }
}
