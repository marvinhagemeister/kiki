import { IFile2 } from "../../io/file";
import { replaceExtension } from "../../utils";
import { Result } from "node-sass";

export function resultToFile(result: Result, file: IFile2) {
  file.location = replaceExtension(file.location, "css");
  file.content = result.css;

  if (file.map && typeof result.map !== "undefined") {
    file.map = result.map;
  }

  return file;
}
