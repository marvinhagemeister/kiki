import * as Emitter from "./Emitter";
import { compile, filterSass } from "./plugins/node-sass";
import { fileFromMatch } from "./utils";
import { writeFiles } from "./writer";
import * as glob from "glob";

const config = {
  dest: "tmp/",
  src: "test/fixtures/",
};

const globOptions = { follow: true, ignore: "**/_*" };
glob(config.src + "*.scss", globOptions, (err, matches) => {
  Emitter.start("sass", config.src);

  const files = fileFromMatch(matches, config);

  return Promise.resolve(files)
    .then(filterSass({
      searchPath: config.src,
    }))
    .then(compile({
      dest: "/tmp",
    }))
    .then(writeFiles("/tmp"))
    .catch((ex: Error) => {
      Emitter.error(ex);
    });
});
