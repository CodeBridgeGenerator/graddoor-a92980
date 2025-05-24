const assert = require('assert');
const app = require('../../src/app');

describe('\'university\' service', () => {
  it('registered the service', () => {
    const service = app.service('university');

    assert.ok(service, 'Registered the service (university)');
  });
});
