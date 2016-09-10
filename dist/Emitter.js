"use strict";
const chalk = require("chalk");
/* tslint:disable no-console */
function start(name, path) {
    console.log(chalk.white("=> compiling " + name + " from: ") + chalk.yellow(path));
}
exports.start = start;
function nothingToWatch() {
    console.log();
    console.log(chalk.white("Nothing to watch"));
    console.log();
}
exports.nothingToWatch = nothingToWatch;
function time(file, time) {
    console.log("  " + chalk.dim(file) + " " + chalk.blue(time + "ms"));
}
exports.time = time;
function invalidJson(message, path) {
    console.log(chalk.red("Invalid JSON in " + path));
    console.log("  " + chalk.red("> " + message.replace(/^\/.+\:\s/, "")));
    console.log();
}
exports.invalidJson = invalidJson;
function missingConfig(path) {
    console.log();
    console.log(chalk.red("Config file not found at " + path));
    console.log();
}
exports.missingConfig = missingConfig;
function error(err) {
    console.log(err);
}
exports.error = error;
// TODO typings
function warning(warn) {
    console.log(chalk.red(warn.text));
    console.log(chalk.white(warn.node));
    console.log();
}
exports.warning = warning;
function success(msg) {
    console.log("  " + chalk.green(msg));
}
exports.success = success;
function change(event, path) {
    event = event === "change" ? "modified" : event;
    console.log();
    console.log(event + ": " + path);
}
exports.change = change;
//# sourceMappingURL=Emitter.js.map