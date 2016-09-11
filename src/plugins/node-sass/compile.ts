import * as Emitter from "../../emitter";
import { IFile } from "../../interfaces";
import { replaceExtension } from "../../utils";
import * as Promise from "bluebird";
import { Options, Result, SassError, render } from "node-sass";
import * as path from "path";

const sass = Promise.promisify(render);

interface ISassOptions extends Options {
  dest?: string;
}

export function compile(opts: ISassOptions) {
  opts = opts || {};

  return (files: IFile[]) => {
    return Promise.all(
      files.map(file => {
        const filename = path.basename(file.location);
        const out = path.join(opts.dest, filename);

        opts.outFile = replaceExtension(out, "css");

        if (file.map !== null) {
          opts.sourceMap = replaceExtension(filename, "css.map");
        }

        if (file.content) {
          opts.data = file.content;
          opts.file = null;
        } else {
          opts.file = file.location;
          opts.data = null;
        }

        return sass(opts).then((res: Result) => {
          file.location = replaceExtension(file.location, "css");
          file.content = res.css.toString();

          if (file.map !== null) {
            file.map = JSON.stringify(res.map.toString());
          }

          return file;
        }).catch((err: SassError) => {
          Emitter.error(err);
        });
      })
    );
  };
}
