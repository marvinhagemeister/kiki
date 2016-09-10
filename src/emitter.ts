import * as chalk from "chalk";

/* tslint:disable no-console */

export function start(name: string, path: string) {
  console.log(chalk.white("=> compiling " + name + " from: ") + chalk.yellow(path));
}

export function nothingToWatch() {
  console.log();
  console.log(chalk.white("Nothing to watch"));
  console.log();
}

export function time(file: string, time: string | Number) {
  console.log("  " + chalk.dim(file) + " " + chalk.blue(time + "ms"));
}

export function invalidJson(message: string, path: string) {
  console.log(chalk.red("Invalid JSON in " + path));
  console.log("  " + chalk.red("> " + message.replace(/^\/.+\:\s/, "")));
  console.log();
}

export function missingConfig(path: string) {
  console.log();
  console.log(chalk.red("Config file not found at " + path));
  console.log();
}

export function error(err: Error) {
  console.log(err);
}

// TODO typings
export function warning(warn: any) {
  console.log(chalk.red(warn.text));
  console.log(chalk.white(warn.node));
  console.log();
}

export function success(msg: string) {
  console.log("  " + chalk.green(msg));
}

export function change(event: string, path: string) {
  event = event === "change" ? "modified" : event;
  console.log();
  console.log(event + ": " + path);
}
