import assert from 'assert';

import {Template} from '../src/template';

const templateSrc = '{block:ShouldGreet}Welcome{block:PageTitle} to {PageTitle}{/block:PageTitle}. {/block:ShouldGreet}I hope you are enjoying your stay{block:You}, {Name}{/block:You}.';
const results = [
  'Welcome. I hope you are enjoying your stay, visitor.',
  'Welcome to my blog. I hope you are enjoying your stay.',
  'Welcome to my blog. I hope you are enjoying your stay, visitor.',
  'I hope you are enjoying your stay, visitor.',
];
const data = [
  {ShouldGreet: true, You: {Name: 'visitor'}},
  {ShouldGreet: true, PageTitle: 'my blog'},
  {ShouldGreet: true, PageTitle: 'my blog', You: {Name: 'visitor'}},
  {ShouldGreet: false, PageTitle: 'my blog', You: {Name: 'visitor'}},
];

const variable = {
  template: '{someVar}',
  data: {someVar: 'Value'},
  result: 'Value',
};
const array = {
  template: 'My array: {block:MyArray}[Item: {Item}]{/block:MyArray}.',
  data: {MyArray: [{Item: 'First'}, {Item: 'Second'}, {Item: 'Third'}]},
  result: 'My array: [Item: First][Item: Second][Item: Third].'
};

describe('Template', () => {
  it('should successfully render text', done => {
    let template = new Template('Hello world');
    assert.equal(template.render(), 'Hello world');
    
    done();
  });
  it('should successfully render variables', done => {
    let template = new Template(variable.template);
    assert.equal(template.render(variable.data), variable.result);

    done();
  });
  it('should successfully render arrays', done => {
    let template = new Template(array.template);
    assert.equal(template.render(array.data), array.result);

    done();
  });
  it('should successfully render templates', done => {
    let template = new Template(templateSrc);
    for (let i = 0; i < results.length; ++i) {
      assert.equal(template.render(data[i]), results[i]);
    }

    done();
  });
});
