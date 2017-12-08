import { IFile } from "./io/file";
import chalk from "chalk";
import { SassError } from "node-sass";

/* tslint:disable no-console */

export interface LoggerAdapter {
  log(...args: any[]): void;
  error(...args: any[]): void;
}

export class Logger {
  constructor(private adapter: LoggerAdapter = console) {}

  start(name: string, path: string) {
    const l = this.adapter;
    l.log();
    l.log(chalk.white(`=> compiling ${name} from: `) + chalk.yellow(path));
    l.log();
  }

  watch(path: string[]) {
    const l = this.adapter;
    l.log(chalk.white("=> watching: ") + chalk.yellow(path.join(", ")));
    l.log();
  }

  nothingToDo() {
    const l = this.adapter;
    l.log();
    l.log(chalk.blue("Nothing to to do!"));
    l.log();
  }

  time(file: string, time: string | number) {
    const l = this.adapter;
    l.log("  " + chalk.dim(file) + " " + chalk.blue(time + "ms"));
  }

  invalidJson(message: string, path: string) {
    const l = this.adapter;
    l.log(chalk.red("Invalid JSON in " + path));
    l.log("  " + chalk.red("> " + message.replace(/^\/.+\:\s/, "")));
    l.log();
  }

  noFilesOrOnlyPartials() {
    const l = this.adapter;
    l.log();
    l.log(
      chalk.yellow(
        "Only partials found. Partials must be imported by " +
          "a root file to be included in compilations.",
      ),
    );
    l.log();
  }

  error(err: SassError | Error | string) {
    const l = this.adapter;

    l.log();
    if (typeof err === "string" || err instanceof String) {
      l.error(chalk.red(err.toString()));
    } else {
      if (err.message.indexOf("search path") > -1) {
        l.error(chalk.red(err.message));
      } else if ((err as any).formatted !== undefined) {
        l.error(chalk.red((err as any).formatted));
      } else {
        l.error(chalk.red(err.stack || ""));
      }
    }

    l.log();
  }

  warning(warn: any) {
    const l = this.adapter;
    l.log(chalk.red(warn.text));
    l.log(chalk.white(warn.node));
    l.log();
  }

  success(msg: string) {
    const l = this.adapter;
    l.log("  " + chalk.green(msg));
  }

  taskDone(files: IFile[], time: number) {
    const l = this.adapter;
    l.log();
    l.log("  " + chalk.white("time: ") + chalk.blue(time + "ms"));
    l.log();

    files.forEach((file, i) => {
      const name = file.location.replace(process.cwd() + "/", "");
      l.log("  " + chalk.dim(name));
    });

    l.log();
  }

  change(event: string, path: string) {
    const l = this.adapter;
    event = event === "change" ? "modified" : event;
    l.log(event + ": " + path);
  }
}

const logger = new Logger(console);
export default logger;
