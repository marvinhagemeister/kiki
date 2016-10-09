import { getRootFiles } from "./getRootFiles";

export interface FilterSassOptions {
  searchPath: string;
}

export function filterSass(files: string[], options?: FilterSassOptions) {
  files = files.filter(file => /.+\.(?:sass|scss)$/.test(file));

  let out: string[] = [];
  for (let i = 0; i < files.length; i++) {
    getRootFiles(options.searchPath, files[i]).forEach(item => {
      if (out.indexOf(item) === -1) {
        out.push(item);
        files.push(item);
      }
    });
  }
  return out;
}
