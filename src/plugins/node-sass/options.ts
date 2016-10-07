import { IFile } from "../../io/file";
import { replaceExtension } from "../../utils";
import { Options } from "node-sass";
import * as path from "path";

export interface SassOptions extends Options {
  dest?: string;
}

export function optionsToLibsass(options: SassOptions, file: IFile) {
  const filename = path.basename(file.location);
  const out = path.join(options.dest, filename);

  options.outFile = replaceExtension(out, "css");

  if (file.map !== null) {
    options.sourceMap = replaceExtension(filename, "css.map");
  }

  if (file.content) {
    options.data = file.content;
    options.file = null;
  } else {
    options.file = file.location;
    options.data = null;
  }

  return options;
}
