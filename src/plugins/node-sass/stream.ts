import { IFile2 } from "../../io/file";
import { optionsToLibsass } from "./options";
import { resultToFile } from "./result";
import { Options, Result, SassError, render } from "node-sass";
import { Transform } from "stream";

export default class SassTransform extends Transform {
  private options: Options;

  constructor(options: Options) {
    super({ objectMode: true });

    this.options = options;
  }

  public _transform(chunk: IFile2, encoding: string, done: () => any) {
    const options = optionsToLibsass(this.options, chunk);

    render(options, (err: SassError, result: Result) => {
      if (err) {
        throw err;
      }

      chunk = resultToFile(result, chunk);
      this.push(chunk);
      done();
    });
  }
}
