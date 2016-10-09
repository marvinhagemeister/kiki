import * as emitter from "./emitter";
import * as chokidar from "chokidar";

export function watch(watchPaths: string[]) {
  return new Promise((resolve, reject) => {
    emitter.watch(watchPaths);
    chokidar.watch(watchPaths, {
      ignoreInitial: true,
      ignored: /[\/\\]\./,
    }).on("all", (event: string, path: string) => {
      emitter.change(event, path);
      resolve(path);
    });
  });
}
