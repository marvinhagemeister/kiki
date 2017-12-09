import { isCI } from "ci-info";
import * as path from "path";
import { white, yellow, stripColor } from "chalk";

export interface Logger {
  change(event: string, file: string): void;
  startWatch(paths: string[]): void;
}

export interface LogAdapter {
  log(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

/* tslint:disable no-console */
const simple: LogAdapter = {
  log(msg: string) {
    console.log(stripColor(msg));
  },
  warn(msg: string) {
    console.warn(msg);
  },
  error(msg: string) {
    console.error(msg);
  },
};
/* tslint:enable no-console */

const defaultAdapter = isCI ? simple : console;

export default class CliLogger implements Logger {
  constructor(private adapter: LogAdapter = defaultAdapter) {}

  startWatch(paths: string[]) {
    this.adapter.log(
      "\n" + white("=> watching: ") + yellow(path.join(", ")) + "\n",
    );
  }

  change(event: string, file: string) {
    event = event === "change" ? "modified" : event;
    this.adapter.log(event + ": " + file);
  }
}
