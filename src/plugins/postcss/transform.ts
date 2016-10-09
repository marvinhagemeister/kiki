import * as emitter from "../../emitter";
import { IFile2 } from "../../io/file";
import { Buffer } from "buffer";
import * as postcss from "postcss";
import { Transform } from "stream";

export class PostCssTransform extends Transform {
  private plugins: any[];

  constructor(plugins: any[]) {
    super({ objectMode: true });

    this.plugins = plugins;
  }

  public _transform(chunk: IFile2, encoding: string, done: (err: Error) => any) {
    // TODO Sourcemap support
    postcss(this.plugins)
      .process(chunk.content.toString())
      .then(res => {
        res.warnings().forEach(warn => emitter.warning(warn));
        chunk.content = Buffer.from(res.css);

        if (res.map) {
          chunk.map = Buffer.from(res.map.toString());
        }

        this.push(chunk);
        done(null);
      })
      .catch((err: Error) => done(err));
  }
}
