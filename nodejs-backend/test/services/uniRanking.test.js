const assert = require('assert');
const app = require('../../src/app');

describe('\'uniRanking\' service', () => {
  it('registered the service', () => {
    const service = app.service('uniRanking');

    assert.ok(service, 'Registered the service (uniRanking)');
  });
});
