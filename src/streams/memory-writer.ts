import { IFile2 } from "../io/file";
import { Writable } from "stream";

export default class MemoryWriter extends Writable {
  private callback: (data: IFile2) => any;

  constructor(callback: (data: IFile2) => any) {
    super({ objectMode: true });

    this.callback = callback;
  }

  public _write(data: IFile2, encoding: string, callback: (err?: Error) => any) {
    this.callback(data);
    callback();
  }
}
