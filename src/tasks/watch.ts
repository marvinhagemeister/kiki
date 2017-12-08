import { IKikiConfig } from "../config";
import emitter from "../logger";
import { filesFromMatch } from "../utils";
import { build as sass } from "./sass";
import * as chokidar from "chokidar";

const watchOpts = {
  ignoreInitial: true,
  ignored: /[\/\\]\./,
};

export function watch(config: IKikiConfig, isProduction: boolean) {
  const watchPaths: string[] = [];
  if (config.sass && config.sass.src) {
    watchPaths.push(config.sass.src);
  }

  emitter.watch(watchPaths);
  (chokidar.watch(watchPaths, watchOpts) as any).on(
    "all",
    (event: string, path: string) => {
      emitter.change(event, path);
      const start = new Date().getTime();

      if (/.+\.scss$/.test(path)) {
        const files = filesFromMatch([path], config.sass!.src);

        return sass(config.sass!, isProduction)(files)
          .then((files2: any[]) => {
            const time = new Date().getTime() - start;
            emitter.taskDone(files2, time);
          })
          .catch((err: Error) => {
            emitter.error(err);

            // Note: Watch tasks should never exit with 1, because that
            // would obviously stop the watcher
          });
      }
    },
  );
}
