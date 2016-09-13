import { IKikiConfig } from "../config/getConfig";
import * as emitter from "../emitter";
import { build as sass } from "./sass";
import task from "./task";
import * as Promise from "bluebird";
import * as path from "path";

process.env.NODE_ENV = "production";

interface IKikiSassConfig {
  src: string;
  dest: string;
}

// Sass
export function buildSass(config: IKikiSassConfig) {
  const globPath = path.resolve(config.src) + "/*.scss";

  return task(globPath, "sass")
    .then(sass)
    .catch(err => {
      emitter.error(err);
    });
}

export function build(config: IKikiConfig) {
  const start = new Date().getTime();

  return Promise.all(buildSass(config.sass))
    .then(items => {
      if (items.length > 0) {
        const time = new Date().getTime() - start;
        emitter.taskDone(items, time);
      }
    }).catch(err => {
      emitter.error(err);
    });
}