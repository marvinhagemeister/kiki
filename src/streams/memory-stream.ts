import { Readable } from "stream";

export default class MemoryStream extends Readable {
  constructor() {
    super({ objectMode: true });
  }

  /* tslint:disable no-empty */
  public _read(size: number) {}
}
