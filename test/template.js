import assert from 'assert';

import {Template} from '../src/template';

const blockTemplate = '{block:ShouldGreet}Welcome{block:PageTitle} to {PageTitle}{/block:PageTitle}. {/block:ShouldGreet}I hope you are enjoying your stay{block:You}, {Name}{/block:You}.';
const blockResults = [
  'Welcome. I hope you are enjoying your stay, visitor.',
  'Welcome to my blog. I hope you are enjoying your stay.',
  'Welcome to my blog. I hope you are enjoying your stay, visitor.',
  'I hope you are enjoying your stay, visitor.',
];
const blockData = [
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
  it('should not render a falsy variable', done => {
    let template = new Template('Hello {World}');
    assert.equal(template.render(), 'Hello ');
    assert.equal(template.render({World: null}), 'Hello ');

    done();
  });
  it('should successfully render blocks', done => {
    let template = new Template(blockTemplate);
    for (let i = 0; i < blockResults.length; ++i) {
      assert.equal(template.render(blockData[i]), blockResults[i]);
    }

    done();
  });
});
