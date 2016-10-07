import { IFile2 } from "../../io/file";
import { replaceExtension } from "../../utils";
import { Result } from "node-sass";

export function resultToFile(res: Result, file: IFile2) {
  file.location = replaceExtension(file.location, "css");
  file.content = res.css;

  if (file.map !== null) {
    file.map = res.map;
  }

  return file;
}
