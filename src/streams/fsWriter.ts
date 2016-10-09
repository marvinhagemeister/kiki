import { IFile2 } from "../io/file";
import { Buffer } from "buffer";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import { Writable } from "stream";

function mkdirpPr(folder: string) {
  return new Promise((resolve, reject) => {
    mkdirp(folder, (err: Error, made: string) => {
      return err ? reject(err) : resolve(made);
    });
  });
}

function fsPr(name: string, data: string | Buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, data, (err: Error) => {
      return err ? reject(err) : resolve();
    })
  });
}

function noop(): null {
  return null;
}

export class FsWriter extends Writable {
  private dest: string;
  private fsPr: any;

  constructor(dest: string) {
    super({ objectMode: true });
    this.dest = path.resolve(dest);
    this.fsPr = fsPr;
  }

  set fsHandler(fsPr: <T>(name: string, data: string | Buffer) => PromiseLike<T>) {
    this.fsPr = fsPr;
  }

  public _write(file: IFile2, encoding: string, callback: (err: Error) => any) {
    const filename = path.basename(file.location);
    const filepath = path.join(this.dest, filename);

    const writeMap = Buffer.isBuffer(file.map)
      ? this.fsPr(filepath + ".map", file.map)
      : noop();

    mkdirpPr(this.dest)
      .then(() => this.fsPr(filepath, file.content))
      .then(() => writeMap)
      .then(callback(null))
      .catch((err: Error) => callback(err));
  }
}
