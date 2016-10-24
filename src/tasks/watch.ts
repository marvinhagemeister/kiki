import { IKikiConfig } from "../config/getConfig";
import * as emitter from "../emitter";
import { writeFiles } from "../io/writeFiles";
import { filesFromMatch } from "../utils";
import { build as sass } from "./sass";
import * as chokidar from "chokidar";

process.env.NODE_ENV = "development";

const watchOpts = {
  ignoreInitial: true,
  ignored: /[\/\\]\./,
};

export function watch(config: IKikiConfig) {
  const watchPaths: string[] = [];
  if (config.sass && config.sass.src) {
    watchPaths.push(config.sass.src);
  }

  if (config.js && config.js.entry) {
    watchPaths.push(config.js.entry);
  }

  emitter.watch(watchPaths);
  chokidar.watch(watchPaths, watchOpts).on("all", (event: string, path: string) => {
    emitter.change(event, path);
    const start = new Date().getTime();

    if (/.+\.scss$/.test(path)) {
      const files = filesFromMatch([path], config.sass.src);

      return sass(config.sass)(files)
        .then(writeFiles(config.sass.dest))
        .then(files => {
          const time = new Date().getTime() - start;
          emitter.taskDone(files, time);
        })
        .catch((err: Error) => {
          emitter.error(err);
        });
    }
  });
}
