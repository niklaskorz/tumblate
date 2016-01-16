import assert from 'assert';

import {render} from '../src/index.js';

describe('Tumblate', () => {
  it('should successfully render a correct template', done => {
    assert.equal('', render('Hello world', {}));
    done();
  });
});
