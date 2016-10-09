import * as Emitter from "../emitter";
import * as glob from "glob";
import * as path from "path";

export interface TaskActions {
  run(files: string[]): void;
}

export interface TaskOptions {
  src: string;
  dest: string;
  env?: string;
}

export class Task implements TaskActions {
  protected env: string;
  protected src: string;
  protected dest: string;
  protected pattern: string = null;

  constructor(options: TaskOptions) {
    this.env = options.env ? options.env : "development";
    this.src = options.src;
    this.dest = options.dest;
    this.emitter = Emitter;
  }

  // TODO create emitter interface
  set emitter(emitter: any) {
    this.emitter = emitter;
  }

  public run(files?: string[]) {
    if (typeof files === "undefined") {
      glob(path.resolve(this.src) + this.pattern, (err, res) => {
        this.process(res);
      });
    } else {
      this.process(files);
    }
  }

  protected process(files: string[]) {
    throw new Error("Process method not implemented in subclass");
  }
}
