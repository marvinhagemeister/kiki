import { IFile2 } from "../../io/file";
import { replaceExtension } from "../../utils";
import { Options } from "node-sass";
import * as path from "path";

export function optionsToLibsass(options: Options, file: IFile2) {
  const filename = path.basename(file.location);
  const out = path.join(file.location, filename);

  options.outFile = replaceExtension(out, "css");

  if (file.map) {
    options.sourceMap = replaceExtension(filename, "css.map");
  }

  if (file.content) {
    options.data = file.content.toString("utf-8");
    options.file = null;
    options.sourceMapRoot = path.dirname(options.outFile);
  } else {
    options.file = file.location;
    options.data = null;
  }

  return options;
}
