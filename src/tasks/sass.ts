import * as emitter from "../emitter";
import { IFile } from "../io/file";
import { IKikiSassConfig, compile as sass, filterSass } from "../plugins/node-sass/index";
import { compile as postcss } from "../plugins/postcss/index";
import * as Promise from "bluebird";

const postCssOpts = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
};

export function build(config: IKikiSassConfig) {
  return (files: IFile[]) => {
    return Promise.resolve(files)
      .then(filterSass({
        searchPath: config.src,
      }))
      .then(sass({
        dest: config.dest,
      }))
      .then(postcss(postCssOpts))
      .catch((ex: Error) => {
        emitter.error(ex);
      });
  };
}
