const chalk = require('chalk');

/* eslint-disable no-console */

function start(name, path) {
  console.log(chalk.white('=> compiling ' + name + ' from: ') + chalk.yellow(path));
}

function nothingToWatch() {
  console.log();
  console.log(chalk.white('Nothing to watch'));
  console.log();
}

function time(file, time) {
  console.log('  ' + chalk.dim(file) + ' ' + chalk.blue(time + 'ms'));
}

function invalidJson(message, path) {
  console.log(chalk.red('Invalid JSON in ' + path));
  console.log('  ' + chalk.red('> ' + message.replace(/^\/.+\:\s/, '')));
  console.log();
}

function missingConfig(path) {
  console.log();
  console.log(chalk.red('Config file not found at ' + path));
  console.log();
}

function error(err) {
  console.log(err);
}

function warning(warn) {
  console.log(chalk.red(warn.text));
  console.log(chalk.white(warn.node));
  console.log();
}

function success(msg) {
  console.log('  ' + chalk.green(msg));
}

function change(event, path) {
  event = event === 'change' ? 'modified' : event;
  console.log();
  console.log(event + ": " + path);
}

module.exports = {
  start,
  nothingToWatch,
  time,
  error,
  warning,
  success,
  invalidJson,
  missingConfig,
  change
};
