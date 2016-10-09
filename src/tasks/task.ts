import * as Emitter from "../emitter";
import * as glob from "glob";
import * as path from "path";

export interface TaskActions {
  run<T>(files: string[]): PromiseLike<T>;
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
  protected emitter: any;

  constructor(options: TaskOptions) {
    this.env = options.env ? options.env : "development";
    this.src = options.src;
    this.dest = options.dest;
    this.emitter = Emitter;
  }

  // TODO create emitter interface
  set logger(emitter: any) {
    this.emitter = emitter;
  }

  public run(files?: string[]) {
    return new Promise((resolve, reject) => {
      if (typeof files === "undefined") {
        const globPath = path.join(this.src, this.pattern !== null
          ? this.pattern
          : "*.test");

        glob(globPath, (err, res) => err !== null
          ? reject(err)
          : resolve(res));
      } else {
        resolve(files);
      }
    })
    .then((items: string[]) => this._process(items));
  }

  public _process(files: string[]) {
    throw new Error("_process() not implemented in subclass");
  }
}
