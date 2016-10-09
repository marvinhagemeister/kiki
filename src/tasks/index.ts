import { IKikiConfig } from "../config/getConfig";
import * as Emitter from "../emitter";
import { SassTransform, filterSass } from "../plugins/node-sass";
import { PostCssTransform } from "../plugins/postcss";
import Writer from "../streams/fs-writer";
import MemoryStream from "../streams/memory-stream";
import { filesFromMatch } from "../utils";
import { watch as watcher } from "../watcher";
import * as autoprefixer from "autoprefixer";
import * as cssnano from "cssnano";

const prefixerOptions = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
  remove: false, // makes autoprefixer 10% faster
};

export function buildSass(files: string[], isProduction: boolean) {
  let plugins = [autoprefixer(prefixerOptions)];

  if (isProduction) {
    plugins.push(cssnano);
  }

  // Create streams
  const stream = new MemoryStream();
  const sass = new SassTransform({ outputStyle: "nested" });
  const postcss = new PostCssTransform(plugins);
  const writer = new Writer();

  // TODO Error handling

  // Write files to stream
  const sassFiles = filterSass(files);
  const queue = filesFromMatch(sassFiles);
  queue.forEach(file => stream.push(file));

  if (queue.length === 0) {
    Emitter.noFilesOrOnlyPartials();
  }

  return stream
    .pipe(sass)
    .pipe(postcss)
    .pipe(writer);
}

export function watch(config: IKikiConfig, isProduction: boolean) {
  const watchPaths: string[] = [];
  if (config.sass && config.sass.src) {
    watchPaths.push(config.sass.src);
  }

  if (config.js && config.js.entry) {
    watchPaths.push(config.js.entry);
  }

  watcher(watchPaths).then((file: string) => {
    if (/.+\.scss$/.test(file)) {
      buildSass([file], isProduction);
    }
  });
}
