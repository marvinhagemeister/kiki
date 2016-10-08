import { IFile2 } from "../../io/file";
import { replaceExtension } from "../../utils";
import { Options } from "node-sass";
import * as path from "path";

export function optionsToLibsass(options: Options, file: IFile2) {
  const out = replaceExtension(file.location, "css");

  if (file.map) {
    options.sourceMap = replaceExtension(out, "css.map");
    options.sourceMapRoot = path.dirname(out);
  }

  if (typeof file.content === "undefined" || file.content === null) {
    throw new Error("File content was `null` or `undefined`");
  }

  options.outFile = out;
  options.data = file.content.toString("utf-8");
  options.file = null;

  return options;
}
