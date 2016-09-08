const t = require('chai').assert;
const { validateConfig } = require('../../src/config/utils');
const sinon = require('sinon');

describe('validateConfig', () => {
  it('should print a message when config is empty', () => {
    const spy = sinon.spy(console, 'log');

    t.equal(validateConfig({}));
    console.log(spy);
    t.ok(spy.calledOnce);
  });

  it('should validate sass path', () => {
    t.equal(validateConfig({
      sass: {}
    }));
  });

  it('should validate sass path', () => {
    t.equal(validateConfig({
      js: {}
    }));
  });
});
