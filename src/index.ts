import * as Emitter from "./emitter";
import { compile as sass, filterSass } from "./plugins/node-sass/index";
import { compile as postcss } from "./plugins/postcss/index";
import { fileFromMatch } from "./utils";
import { writeFiles } from "./writer";
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
  ]
};

const globOptions = { follow: true, ignore: "**/_*" };
glob(config.src + "*.scss", globOptions, (err, matches) => {
  Emitter.start("sass", config.src);

  const files = fileFromMatch(matches, config);

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
      Emitter.error(ex);
    });
});
