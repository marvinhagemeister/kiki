import { IFile } from "./interfaces";
import * as Promise from "bluebird";
import * as fs from "fs";
import * as mkdirpCb from "mkdirp";
import * as path from "path";

const mkdirp = Promise.promisify(mkdirpCb);

export function writeFiles(dest: string) {
  dest = path.resolve(dest);

  return (files: IFile[]) => {
    return Promise.all(
      files.forEach((file: IFile) => {
        console.log(file);
        const name = path.basename(file.location);

        return mkdirp(dest).then(() => {
          fs.writeFileSync(path.join(dest, name), file.content);

          if (file.map !== null) {
            fs.writeFileSync(path.join(dest, name), file.content);
          }

          return file;
        });
      })
    );
  };
}
