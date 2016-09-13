import { IFile } from "./io/file";
import * as path from "path";

export function replaceExtension(file: string, ext: string) {
  ext = !ext.startsWith(".") ? "." + ext : ext;

  const base = path.basename(file);
  const nFile = base.replace(path.extname(file), ext);
  return path.join(path.dirname(file), nFile);
}

export function filesFromMatch(matches: string[]): IFile[] {
  return matches.map(match => {
    return {
      location: match,
      map: null,
    };
  });
}

export function resolveApp(relativePath: string) {
  return path.resolve(relativePath);
}
