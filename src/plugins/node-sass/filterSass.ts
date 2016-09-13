import { IFile } from "../../io/file";
import { getRootFiles } from "./getRootFiles";
import * as fs from "fs";

interface ISassFilterOptions {
  searchPath: string;
}

export function filterSass(opts?: ISassFilterOptions) {
  if (!opts.searchPath) {
    throw new Error("Sass Plugin didn't receive a search path");
  }

  try {
    fs.lstatSync(opts.searchPath);
  } catch (err) {
    throw new Error("Sass search path \"" + opts.searchPath + "\" does not exist");
  }

  return (files: IFile[]) => {
    const sassFiles = files.filter(f => /\.scss$/.test(f.location));

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

    return newSassFiles;
  };
}
