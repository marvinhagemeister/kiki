import { IFile } from "../io/file";
import { writeFile } from "../io/writeFiles";
import {
  compile as sass,
  filterSass,
  IKikiSassConfig,
} from "../plugins/node-sass/index";
import {
  compile as postcss,
  ICustomPostCssOptions,
} from "../plugins/postcss/index";

const postCssOpts: ICustomPostCssOptions = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
  remove: false, // makes autoprefixer 10% faster
};

export function build(config: IKikiSassConfig, isProduction: boolean) {
  if (config.cssnext !== undefined) {
    postCssOpts.cssnext = config.cssnext;
  }

  if (config.addVendorPrefixes !== undefined) {
    postCssOpts.addVendorPrefixes = config.addVendorPrefixes;
  }

  return (files: IFile[]) => {
    files = filterSass(files, config.src);

    return Promise.all(
      files.map(file => {
        return Promise.resolve(file)
          .then(sass({ dest: config.dest, production: isProduction }))
          .then(postcss(postCssOpts))
          .then(x => writeFile(config.dest, x))
          .catch((err: Error) => {
            throw err;
          });
      }),
    );
  };
}
