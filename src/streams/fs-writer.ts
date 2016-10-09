import { Buffer } from "buffer";
import * as fs from "fs";
import { Writable } from "stream";

export default class FsWriter extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  public _write(data: Buffer, encoding: string, callback: (err: Error) => any) {
    console.log(data);

    callback(null);
  }
}
