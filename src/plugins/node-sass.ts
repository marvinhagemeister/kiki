import * as Emitter from "../emitter";
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
    const sassFiles = files.filter(f => /\.scss$/.test(f.location));
    const nonSassFiles = files.filter(f => !/\.scss$/.test(f.location));

    const lookup: string[] = [];
    let newSassFiles: IFile[] = [];

    sassFiles.forEach(file => {
      getRootFiles(opts.searchPath, file).forEach(item => {
        const loc = item.location;

        if (lookup.indexOf(loc) === -1) {
          newSassFiles.push(item);
          lookup.push(loc);
        }
      });
    });

    return nonSassFiles.concat(newSassFiles);
  };
}

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
