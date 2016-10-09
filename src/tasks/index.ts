import { IKikiConfig } from "../config/getConfig";
import * as Emitter from "../emitter";
import { IFile2 } from "../io/file";
import { SassTransform, filterSass } from "../plugins/node-sass";
import { PostCssTransform } from "../plugins/postcss";
import { FsWriter as Writer } from "../streams/fsWriter";
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

export function buildSass(files: string[], options: IKikiConfig, isProduction: boolean) {
  let plugins = [autoprefixer(prefixerOptions)];

  if (isProduction) {
    plugins.push(cssnano);
  }

  // TODO create stream from glob
  // Create streams
  const stream = new MemoryStream();
  const sass = new SassTransform({ outputStyle: "nested" });
  const postcss = new PostCssTransform(plugins);
  const writer = new Writer("tmp/");

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

export function build(config: IKikiConfig, isProduction: boolean) {
    const start = new Date().getTime();

    // return Promise.all(buildSass(config.sass))
    //   .then((items: IFile2[]) => {
    //     if (items.length > 0) {
    //       const time = new Date().getTime() - start;
    //       Emitter.taskDone(items, time);
    //     }
    //   }).catch(err => {
    //     Emitter.error(err);
    //   });
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
      buildSass([file], config, isProduction);
    }
  });
}
