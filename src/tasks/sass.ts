import * as emitter from "../emitter";
import { IFile } from "../interfaces";
import { compile as sass, filterSass } from "../plugins/node-sass/index";
import { compile as postcss } from "../plugins/postcss/index";
import { writeFiles } from "./io/writeFiles";
import * as Promise from "bluebird";

const config = {
  dest: "tmp/",
  src: "test/fixtures/",
};

const postCssOpts = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
};

export function build(files: IFile[]) {
  return Promise.resolve(files)
    .then(filterSass({
      searchPath: config.src,
    }))
    .then(sass({
      dest: "/tmp",
    }))
    .then(postcss(postCssOpts))
    .then(writeFiles("/tmp"))
    .catch((ex: Error) => {
      emitter.error(ex);
    });
}
