import * as emitter from "./emitter";
import { writeFiles } from "./io/writeFiles";
import { compile as sass, filterSass } from "./plugins/node-sass/index";
import { compile as postcss } from "./plugins/postcss/index";
import { filesFromMatch } from "./utils";
import * as glob from "glob";

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

const globOptions = { follow: true, ignore: "**/_*" };
glob(config.src + "*.scss", globOptions, (err, matches) => {
  emitter.start("sass", config.src);

  const files = filesFromMatch(matches);

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
});
