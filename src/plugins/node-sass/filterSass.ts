import { IFile } from "../../io/file";
import { getRootFiles } from "./getRootFiles";
import * as fs from "fs";

interface ISassFilterOptions {
  searchPath: string;
}

export function filterSass(files: IFile[], opts: ISassFilterOptions) {
  try {
    fs.lstatSync(opts.searchPath);
  } catch (err) {
    throw new Error("Sass search path \"" + opts.searchPath + "\" does not exist");
  }

  const sassFiles = files
    .filter(f => /\.scss$/.test(f.location))
    .map(file => getRootFiles(opts.searchPath, file));

  const merged = Array.prototype.concat.apply([], sassFiles);

  const lookup: string[] = [];
  let out: IFile[] = [];

  for (let i = 0; i < merged.length; i++) {
    const loc = merged[i].location;

    if (lookup.indexOf(loc) === -1) {
      lookup.push(loc);
      out.push(merged[i]);
    }
  }

  return out;
}
