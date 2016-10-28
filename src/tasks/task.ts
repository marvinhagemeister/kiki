import * as emitter from "../emitter";
import { filesFromMatch } from "../utils";
import { find } from "nicer-fs";

const globOptions = { follow: true, ignore: "**/_*" };
export default function task(globPath: string, basePath: string, taskName: string) {
  emitter.start(taskName, globPath);

  return find(globPath, globOptions)
    .then((matches: string[]) => {
      if (matches.length === 0) {
        emitter.nothingToDo();
        return [];
      }

      return filesFromMatch(matches, basePath);
    });
};
