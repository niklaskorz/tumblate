import assert from 'assert';
import fs from 'fs';

import {render} from '../src/index';

describe('Tumblate', () => {
  it('should successfully render a correct template', done => {
    fs.readFile('test/template/index.html', (err, index) => {
      assert.ifError(err);
      fs.readFile('test/template/expected.html', (err, expected) => {
        assert.ifError(err);
        fs.readFile('test/template/data.json', (err, dataSrc) => {
          assert.ifError(err);
          const data = JSON.parse(dataSrc);
          assert.equal(render(index, data), expected.toString('utf8'));
          done();
        });
      });
    });
  });
});
