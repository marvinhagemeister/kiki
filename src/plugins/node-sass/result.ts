import { IFile2 } from "../../io/file";
import { replaceExtension } from "../../utils";
import { Buffer } from "buffer";
import { Result } from "node-sass";
import * as path from "path";

export function resultToFile(result: Result, file: IFile2) {
  if (file.map && typeof result.map !== "undefined") {
    const map = JSON.parse(result.map.toString());
    const cwd = process.cwd();
    const regex = new RegExp("\.\." + cwd + "/stdin", "g");

    // Fix stdin mapping source
    map.sources = map.sources
      .map((source: string) => source.replace(regex, path.basename(file.location)));

    file.map = Buffer.from(JSON.stringify(map));
  }

  file.location = replaceExtension(file.location, "css");
  file.content = result.css;

  return file;
}
