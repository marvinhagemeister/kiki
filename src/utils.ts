import { IFile } from "./interfaces";
import * as path from "path";

export function replaceExtension(file: string, ext: string) {
  ext = !ext.startsWith(".") ? "." + ext : ext;

  const base = path.basename(file);
  const nFile = base.replace(path.extname(file), ext);
  return path.join(path.dirname(file), nFile);
}

interface ILookup {
  [key: string]: any;
}

export function createLookup(array: ILookup[], key: string): Object {
  let lookup: ILookup = {};
  for (let i = 0, len = array.length; i < len; i++) {
    lookup[array[i][key]] = array[i];
  }

  return lookup;
}

export function fileFromMatch(matches: string[], options: Object): IFile[] {
  return matches.map(match => {
    let nFile: IFile = {
      dest: null,
      location: match,
      map: null,
    };

    return Object.assign(nFile, options);
  });
}
