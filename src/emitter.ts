import { IFile } from "./io/file";
import * as chalk from "chalk";

/* tslint:disable no-console */

export function start(name: string, path: string) {
  console.log();
  console.log(chalk.white("=> compiling " + name + " from: ") + chalk.yellow(path));
}

export function watch(path: string[]) {
  console.log();
  console.log(chalk.white("=> watching: ") + chalk.yellow(path.join(", ")));
  console.log();
}

export function nothingToDo() {
  console.log();
  console.log(chalk.blue("Nothing to to do!"));
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

export function error(err: Error | string) {
  console.log();
  if (typeof err === "string" || err instanceof String) {
    console.log(chalk.red(err.toString()));
  } else {
    if (err.message.indexOf("search path") > -1) {
      console.log(chalk.red(err.message));
    } else {
      console.log(chalk.red(err.stack));
    }
  }

  console.log();
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

export function taskDone(files: IFile[], time: number) {
  console.log();
  console.log("  " + chalk.white("time: ") + chalk.blue(time + "ms"));
  console.log();

  files.forEach((file, i) => {
    const name = file.location.replace(process.cwd(), "");
    console.log("  " + chalk.dim(name));
  });

  console.log();
}

export function change(event: string, path: string) {
  event = event === "change" ? "modified" : event;
  console.log(event + ": " + path);
}
