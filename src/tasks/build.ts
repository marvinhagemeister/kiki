import { IKikiConfig } from "../config/getConfig";
import * as emitter from "../emitter";
import { IFile } from "../io/file";
import { IKikiSassConfig } from "../plugins/node-sass/index";
import { build as sass } from "./sass";
import task from "./task";
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

  const promises = buildSass(config.sass as any, config.production as any);
  return Promise.all(promises as any)
    .then((items: any[]) => {
      if (items.length > 0) {
        const time = new Date().getTime() - start;
        emitter.taskDone(items, time);
      }

      return items;
    })
    .catch((err: Error) => {
      emitter.error(err);
      process.exit(1);
    });
}
