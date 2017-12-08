import * as path from "path";
import { LoggerAdapter } from "../logger";
import * as ansi from "ansi-regex";

export const fixturePath = path.resolve(__dirname, "fixtures");

export function getFixture(fixture: string) {
  return path.resolve(fixturePath, fixture);
}

const reg = ansi();
export class StubLogger implements LoggerAdapter {
  _output: string = "";

  get output() {
    return this._output.replace(reg, "");
  }

  log(...args: any[]) {
    this._output += args.join("\n") + "\n";
  }

  error(...args: any[]) {
    this._output += args.join("\n") + "\n";
  }
}
