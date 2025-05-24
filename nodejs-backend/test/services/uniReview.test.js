const assert = require('assert');
const app = require('../../src/app');

describe('\'uniReview\' service', () => {
  it('registered the service', () => {
    const service = app.service('uniReview');

    assert.ok(service, 'Registered the service (uniReview)');
  });
});
