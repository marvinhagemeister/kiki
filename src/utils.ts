import * as path from "path";

export function replaceExtension(file: string, ext: string) {
  ext = !ext.startsWith(".") ? "." + ext : ext;

  const base = path.basename(file);
  const nFile = base.replace(path.extname(file), ext);
  return path.join(path.dirname(file), nFile);
}
