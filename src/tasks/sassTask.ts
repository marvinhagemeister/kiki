import { IKikiConfig } from "../config/getConfig";
import * as Emitter from "../emitter";
import { IFile2 } from "../io/file";
import { SassTransform, filterSass } from "../plugins/node-sass";
import { PostCssTransform } from "../plugins/postcss";
import { FsWriter as Writer } from "../streams/fsWriter";
import MemoryStream from "../streams/memory-stream";
import { filesFromMatch } from "../utils";
import { Task, TaskOptions } from "./task";
import * as autoprefixer from "autoprefixer";
import * as cssnano from "cssnano";
import * as glob from "glob";
import * as path from "path";

const prefixOptions = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
  remove: false, // makes autoprefixer 10% faster
};

export class SassTask extends Task {
  protected pattern: string = "**/*.s[a|c]ss";
  private plugins: any[];

  constructor(options: TaskOptions) {
    super(options);

    this.plugins = [autoprefixer(prefixOptions)];
    if (this.env === "production") {
      this.plugins.push(cssnano);
    }
  }

  protected process(files: string[]) {
    // Create streams
    const stream = new MemoryStream();
    const sass = new SassTransform({ outputStyle: "nested" });
    const postcss = new PostCssTransform(this.plugins);
    const writer = new Writer(this.dest);

    // TODO Error handling

    // Write files to stream
    const sassFiles = filterSass(files);
    const queue = filesFromMatch(sassFiles);
    queue.forEach(file => stream.push(file));

    if (queue.length === 0) {
      this.emitter.noFilesOrOnlyPartials();
      return;
    }

    return stream
      .pipe(sass)
      .pipe(postcss)
      .pipe(writer);
  }
}

export function buildSass(files: string[], options: IKikiConfig, isProduction: boolean) {
  // TODO delete me
}
