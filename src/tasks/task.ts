import * as emitter from "../emitter";
import { IFile } from "../io/file";
import { filesFromMatch } from "../utils";
import * as Promise from "bluebird";
import * as glob from "glob";

const globOptions = { follow: true, ignore: "**/_*" };
export default function task(globPath: string, taskName: string) {
  return new Promise((resolve, reject) => {
    emitter.start(taskName, globPath);
    glob(globPath, globOptions, (err, matches) => {
      if (err) {
        reject(err);
      }

      if (matches.length === 0) {
        emitter.nothingToDo();
        resolve([]);
      }

      const files: IFile[] = filesFromMatch(matches);

      resolve(files);
    });
  });
};
