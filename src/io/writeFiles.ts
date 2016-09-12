import * as Emitter from "../emitter";
import { IFile } from "../interfaces";
import * as Promise from "bluebird";
import * as fs from "fs";
import * as mkdirpCb from "mkdirp";
import * as path from "path";

const mkdirp = Promise.promisify(mkdirpCb);

export function writeFiles(dest: string) {
  dest = path.resolve(dest);

  return (files: IFile[]): Promise<any> => {
    return Promise.all(
      files.map((file: IFile) => {
        const name = path.basename(file.location);

        return mkdirp(dest).then(() => {
          const outPath = path.join(dest, name);
          fs.writeFileSync(outPath, file.content);

          if (file.map !== null) {
            fs.writeFileSync(path.join(dest, name), file.content);
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
