import { IKikiConfig } from "../config/getConfig";
import * as emitter from "../emitter";
import { filesFromMatch } from "../utils";
import { build as sass } from "./sass";
import * as chokidar from "chokidar";

process.env.NODE_ENV = "development";

const watchPaths = [
  "test/fixtures/",
];

const watchOpts = {
  ignoreInitial: true,
  ignored: /[\/\\]\./,
};

export function watch(config: IKikiConfig) {
  chokidar.watch(watchPaths, watchOpts).on("all", (event, path) => {
    emitter.change(event, path);

    if (/.+\.scss$/.test(path)) {
      const files = filesFromMatch([path]);
      sass(config.sass)(files);
    }
  });
}
