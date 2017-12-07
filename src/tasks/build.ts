import { IKikiConfig } from "../config/getConfig";
import * as emitter from "../emitter";
import { IFile } from "../io/file";
import { IKikiSassConfig } from "../plugins/node-sass/index";
import { build as sass } from "./sass";
import task from "./task";
import * as Promise from "bluebird";
import * as path from "path";

// Sass
export function buildSass(config: IKikiSassConfig, isProduction: boolean) {
  const base = path.resolve(config.src);
  const globPath = base + "/**/*.scss";

  return task(globPath, base, "sass")
    .then(sass(config, isProduction))
    .catch((err: Error) => {
      throw err;
    });
}

export function build(config: IKikiConfig) {
  const start = new Date().getTime();

  return Promise.all(buildSass(config.sass, config.production))
    .then((items: IFile[]) => {
      if (items.length > 0) {
        const time = new Date().getTime() - start;
        emitter.taskDone(items, time);
      }

      return items;
    })
    .catch(err => {
      emitter.error(err);
      process.exit(1);
    });
}
