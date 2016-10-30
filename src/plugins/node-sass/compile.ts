import { IFile } from "../../io/file";
import { replaceExtension } from "../../utils";
import * as Promise from "bluebird";
import { Options, Result, SassError, render } from "node-sass";
import * as path from "path";

const sass = (opts: ISassOptions) => {
  // Basic minifying because cssnone breaks css even in safe mode
  // TODO: investigate in a better css minifier
  if (opts.production) {
    opts.outputStyle = "compressed";
  }

  return new Promise((res, rej) => {
    render(opts, (err, result) => {
      if (err) {
        rej(err);
      }

      res(result);
    });
  });
};

interface ISassOptions extends Options {
  dest?: string;
  production: boolean;
}

export function compile(opts: ISassOptions) {
  opts = opts || { production: false };

  return (file: IFile) => {
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
        file.map = JSON.parse(res.map.toString());
      }

      return file;
    }).catch((err: SassError) => {
      throw err;
    });
  };
}
