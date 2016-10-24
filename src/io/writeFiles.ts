import * as Emitter from "../emitter";
import { IFile } from "./file";
import * as Promise from "bluebird";
import * as fs from "fs";
import * as mkdirpCb from "mkdirp";
import * as path from "path";

const mkdirp = Promise.promisify(mkdirpCb);

export function writeFiles(dest: string) {
  dest = path.resolve(dest);

  return (files: IFile[]) => {
    return Promise.all(
      files.map((file: IFile) => {
        const name = path.basename(file.location);

        // Keep subfolder structure if we find any
        const fileDest = path.resolve(path.join(dest, file.base));

        return mkdirp(fileDest).then(() => {
          const outPath = path.join(fileDest, name);
          fs.writeFileSync(outPath, file.content);

          if (file.map !== null) {
            fs.writeFileSync(path.join(fileDest, name), file.content);
          }

          file.location = outPath;

          return file;
        }).catch(err => {
          Emitter.error(err);
        });
      })
    );
  };
}
