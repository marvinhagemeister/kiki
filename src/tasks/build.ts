import * as emitter from "../emitter";
import { IFile } from "../interfaces";
import { filesFromMatch } from "../utils";
import { build as sass } from "./sass";
import * as Promise from "bluebird";
import * as glob from "glob";
import * as path from "path";

process.env.NODE_ENV = "production";

interface IKikiConfig {
  sass?: {
    src: string;
    dest: string;
  }
}

interface IKikiSassConfig {
  src: string;
  dest: string;
}

// Sass
export function buildSass(config: IKikiSassConfig) {
  const globPath = path.resolve(config.src) + "/*.scss";
  const globOptions = { follow: true, ignore: "**/_*" };

  return new Promise((resolve, reject) => {
    emitter.start("sass", config.src);
    glob(globPath, globOptions, (err, matches) => {
      if (err) {
        reject(err);
      }

      if (matches.length === 0) {
        emitter.nothingToDo();
        resolve([]);
      }

      const files: IFile[] = filesFromMatch(matches);
      resolve(sass(files));
    });
  })
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
