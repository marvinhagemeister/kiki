#!/usr/bin/env node
import * as program from "commander";
import { spawn } from "cross-spawn";
import * as chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
const version = require("../../package").version;

function fileExists(file: string) {
  try {
    fs.lstatSync(path.resolve(process.cwd(), file));
  } catch (err) {
    console.error(chalk.red("Config file not found at: ")
      + path.resolve(file));
    process.exit(1);
  }
}

program
  .version(version)
  .usage("<command> [options]")
  .command("watch", "Watch for file changes and compile immediately")
  .command("build", "Build minified production files")
  .option(
    "-c, --config [path/to/config]",
    "Path to config file. Defaults to kiki.config.json",
    fileExists,
    "kiki.config.json",
  )
  .option("-p, --production", "Force production builds", false)
  .option("-v, --version", "output the version number")
  .parse(process.argv);

const command = program.args[0];
if (typeof command === "undefined") {
  console.error(chalk.red("Missing command argument!"));
  process.exit(1);
} else if (["watch", "build"].indexOf(command) < 0) {
  console.error(chalk.red("Unkown command: ") + command);
  process.exit(1);
}

if (typeof (program as CLICommands).production === "undefined") {
  (program as CLICommands).production = false;
}

const args = [];
args.push((program as CLICommands).config);
args.push((program as CLICommands).production.toString());

const child = spawn(
  "node",
  [require.resolve("../cli/" + command)].concat(args),
  {stdio: "inherit"},
);

child.on("close", closeHandler);
child.on("error", closeHandler);
child.on("exit", closeHandler);

function closeHandler(code: number, signal: string) {
  if (signal === "SIGSEGV" || code === 1) {
    process.exit(1);
  }

  process.exit(code);
}
