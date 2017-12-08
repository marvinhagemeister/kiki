import { IFile } from "../../io/file";
import { replaceExtension } from "nicer-fs";
import * as ns from "node-sass";
import * as path from "path";
import { promisify } from "util";

export const sass = promisify(ns.render.bind(ns));

interface ISassOptions extends ns.Options {
  dest?: string;
  production: boolean;
}

export function compile(opts: ISassOptions) {
  opts = opts || { production: false };

  return (file: IFile) => {
    const filename = path.basename(file.location);
    const out = path.join(opts.dest as any, filename);

    opts.outFile = replaceExtension(out, "css");

    if (file.map !== null) {
      opts.sourceMap = replaceExtension(filename, "css.map");
    }

    if (file.content) {
      opts.data = file.content;
      (opts as any).file = null;
    } else {
      opts.file = file.location;
      (opts as any).data = null;
    }

    return sass(opts)
      .then((res: any) => {
        file.location = replaceExtension(file.location, "css");
        file.content = res.css.toString();

        if (file.map !== null) {
          file.map = JSON.parse(res.map.toString());
        }

        return file;
      })
      .catch((err: ns.SassError) => {
        throw err;
      });
  };
}
