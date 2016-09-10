import { IFile } from "../interfaces";
import { replaceExtension } from "../utils";
import * as Promise from "bluebird";
import { Options, Result, SassError, render } from "node-sass";
import * as path from "path";
import { parseDir } from "sass-graph";

const sass = Promise.promisify(render);

export function getRootFiles(searchPath: string, modified: IFile): IFile[] {
  const { location } = modified;
  const graph = parseDir(searchPath);

  const node = graph.index[location];
  const files = typeof node !== "undefined"
    && node.importedBy.length > 0
    ? node.importedBy
    : [location];

  return files.map(file => {
    return Object.assign({}, modified, {
      location: file,
    });
  });
}

interface ISassFilterOptions {
  searchPath: string;
}

export function filterSass(opts?: ISassFilterOptions) {
  if (!opts.searchPath) {
    throw new Error("Sass Plugin didn't receive a search path");
  }

  return (files: IFile[]) => {
    return files.forEach((file, i) => {
      if (/\.scss$/.test(file.location)) {
        files.splice(i, 1);

        getRootFiles(opts.searchPath, file).forEach(item => {
          return files.push(item);
        });
      }
    });
  };
}

export function compile(opts?: Options) {
  opts = opts || {};

  return (file: IFile) => {
    const filename = path.basename(file.location);
    const out = path.join(file.dest, filename);
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
      file.content = res.css.toString();

      if (file.map !== null) {
        file.map = JSON.stringify(res.map.toString());
      }

      return file;
    }).catch((err: SassError) => {
      console.log(err);
    });
  };
}
