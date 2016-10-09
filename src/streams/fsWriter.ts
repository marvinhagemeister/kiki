import { IFile2 } from "../io/file";
import { Buffer } from "buffer";
import * as fs from "fs";
import * as path from "path";
import { Writable } from "stream";

export interface FsWriterHandler {
  writeFile(path: string, data: string | Buffer, callback: (err: Error) => any): void;
}

export class FsWriter extends Writable {
  private dest: string;
  private fs: any;

  constructor(dest: string) {
    super({ objectMode: true });
    this.dest = path.resolve(dest);
    this.fs = fs;
  }

  set fsHandler(fs: FsWriterHandler) {
    this.fs = fs;
  }

  public _write(file: IFile2, encoding: string, callback: (err: Error) => any) {
    const filename = path.basename(file.location);

    this.fs.writeFile(this.dest + filename, file.content, (err: Error) => {
      if (err) { callback(err); }

      if (file.map) {
        this.fs.writeFile(this.dest + filename + ".map", file.map, (mapErr: Error) => {
          callback(mapErr !== null ? mapErr : null);
        });
      } else {
        callback(null);
      }
    });
  }
}
