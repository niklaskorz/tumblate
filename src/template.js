import {Parser} from './parser';

let parser = new Parser;

class ScopeArray {
  constructor(array) {
    this.array = array;
    this.index = 0;
  }

  next() {
    const index = this.index + 1;
    if (index < this.array.length) {
      this.index = index;
      return true;
    }
    return false;
  }

  hasProperty(name) {
    return this.array[this.index].hasOwnProperty(name);
  }

  getProperty(name) {
    return this.array[this.index][name];
  }
}

function getProperty(scope, name, index) {
  for (let i = scope.length - 1; i >= 0; --i) {
    if (scope[i] instanceof ScopeArray && scope[i].hasProperty(name)) {
      return scope[i].getProperty(name);
    } else if (scope[i] instanceof Object && scope[i].hasOwnProperty(name)) {
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
        if (scope[level] instanceof ScopeArray && scope[level].next()) {
          indices[level] = 0;
          continue;
        }

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
          indices.push(0);

          if (value instanceof Array) {
            scope.push(new ScopeArray(value));
          } else if (value instanceof Object) {
            scope.push(value);
          } else {
            scope.push(null);
          }
        } else if (node.type === 'var') {
          result += value;
        }
      }
    }
    
    return result;
  }
}
