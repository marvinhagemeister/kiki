const resolveApp = require('./utils').resolveApp;
const configPath = resolveApp('kiki.config.json');
const emitter = require('../emitter');

module.exports = function getConfig() {
  try {
    let config = require(configPath);

    return config;
  } catch (err) {
    if (err.toString().indexOf('in JSON') > -1) {
      emitter.invalidJson(err.message, configPath);
    } else {
      emitter.missingConfig(configPath);
    }

    process.exit(1);
  }
}
