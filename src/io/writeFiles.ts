import Emitter from "../logger";
import { IFile } from "./file";
import { writeFile as write } from "nicer-fs";
import * as path from "path";

export async function writeFile(dest: string, file: IFile) {
  dest = path.resolve(dest);

  const name = path.basename(file.location);

  // Keep subfolder structure if we find any
  const fileDest = path.resolve(path.join(dest, file.base, name));
  file.location = fileDest;

  try {
    const promises = [write(fileDest, file.content as any)];
    if (file.map) {
      promises.push(write(fileDest + ".map", file.map.toString()));
    }

    await Promise.all(promises);
    return file;
  } catch (err) {
    Emitter.error(err);
  }
}
