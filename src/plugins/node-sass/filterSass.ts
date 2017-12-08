import { IFile } from "../../io/file";
import { getRootFiles } from "./getRootFiles";
import * as fs from "fs";

export function filterSass(files: IFile[], searchPath: string) {
  try {
    fs.lstatSync(searchPath);
  } catch (err) {
    throw new Error('Sass search path "' + searchPath + '" does not exist');
  }

  const sassFiles = files
    .filter(f => /\.scss$/.test(f.location))
    .map(file => getRootFiles(searchPath, file));

  const merged = Array.prototype.concat.apply([], sassFiles);

  const lookup: string[] = [];
  const out: IFile[] = [];

  for (const item of merged) {
    const loc = item.location;

    if (lookup.indexOf(loc) === -1) {
      lookup.push(loc);
      out.push(item);
    }
  }

  return out;
}
