import * as Emitter from "../emitter";
import { IFile } from "./file";
import { writeFile as write } from "nicer-fs";
import * as path from "path";

export function writeFile(dest: string) {
  dest = path.resolve(dest);

  return (file: IFile) => {
    const name = path.basename(file.location);

    // Keep subfolder structure if we find any
    const fileDest = path.resolve(path.join(dest, file.base, name));
    file.location = fileDest;

    return write(fileDest, file.content as any)
      .then(() => {
        if (file.map) {
          return write(fileDest + ".map", file.map.toString());
        }
      })
      .then(() => file)
      .catch(err => {
        Emitter.error(err);
      });
  };
}
