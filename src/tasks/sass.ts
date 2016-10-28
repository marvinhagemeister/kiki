import { IFile } from "../io/file";
import { writeFile } from "../io/writeFiles";
import { IKikiSassConfig, compile as sass, filterSass } from "../plugins/node-sass/index";
import { ICustomPostCssOptions, compile as postcss } from "../plugins/postcss/index";
import * as Promise from "bluebird";

const postCssOpts: ICustomPostCssOptions = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
  remove: false, // makes autoprefixer 10% faster
};

export function build(config: IKikiSassConfig) {
  if (typeof config.cssnext !== "undefined") {
    postCssOpts.cssnext = config.cssnext;
  }

  if (typeof config.addVendorPrefixes !== "undefined") {
    postCssOpts.addVendorPrefixes = config.addVendorPrefixes;
  }

  return (files: IFile[]) => {
    files = filterSass(files, config.src);

    return Promise.all(files.map(file => {
      return Promise.resolve(file)
        .then(sass({ dest: config.dest }))
        .then(postcss(postCssOpts))
        .then(writeFile(config.dest))
        .catch((err: Error) => {
          throw err;
        });
    }));
  };
}
