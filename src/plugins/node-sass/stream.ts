import { IFile2 } from "../../io/file";
import { Transform } from "stream";

export default class SassTransform extends Transform {
  constructor() {
    super({
      encoding: "utf-8",
      objectMode: true,
    });
  }

  public _transform(chunk: IFile2, encoding: string, done: () => any) {
    console.log(chunk);

    this.push(JSON.stringify(chunk));
    done();
  }
}
