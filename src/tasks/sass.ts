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
import { Environment } from "./task";

const postCssOpts: ICustomPostCssOptions = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
  remove: false, // makes autoprefixer 10% faster
};

export function build(env: Environment, files: IFile[]) {
  const config = env.options as any;

  files = filterSass(files, config.src);

  if (files.length === 0) {
    env.logger.noFilesOrOnlyPartials();
    return Promise.resolve([]);
  }

  return Promise.all(
    files.map(file => {
      return Promise.resolve(file)
        .then(sass({ dest: config.dest, production: true }))
        .then(postcss(postCssOpts))
        .then(x => writeFile(config.dest, x));
    }),
  );
}
