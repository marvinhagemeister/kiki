const path = require('path');
const chalk = require('chalk');

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

function logMissingSection(name) {
  console.log(chalk.red(name + ' src or dest path not specified'));
  console.log();
  console.log(chalk.dim('// kiki.js'));
  console.log('{');
  console.log('  ' + chalk.yellow(name + ': {'));
  console.log('    ' + chalk.yellow('src:') + chalk.dim(' ...,'));
  console.log('    ' + chalk.yellow('dest:') + chalk.dim(' ...'));
  console.log('  ' + chalk.yellow('}') + ',');
  console.log('  ' + chalk.dim('...'));
  console.log('}');
  console.log();
}

function validateConfig(config) {
  if (Object.keys(config).length === 0 && config.constructor === Object) {
    console.log();
    console.log(chalk.red('Received empty config file'));
    console.log();
  }

  if (config.sass) {
    if (!config.sass.src || !config.sass.dest) {
      logMissingSection('sass');
    }
  }

  if (config.js) {
    if (!config.js.src || !config.js.dest) {
      logMissingSection('js');
    }
  }

  return null;
}

module.exports = {
  resolveApp,
  validateConfig
};
