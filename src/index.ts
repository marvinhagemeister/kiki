import * as emitter from "./emitter";
import { build as sass } from "./tasks/sass";
import { filesFromMatch } from "./utils";
import * as glob from "glob";

const config = {
  dest: "tmp/",
  src: "test/fixtures/",
};

const globOptions = { follow: true, ignore: "**/_*" };
glob(config.src + "*.scss", globOptions, (err, matches) => {
  emitter.start("sass", config.src);

  const start =  new Date().getTime();
  const files = filesFromMatch(matches);

  return sass(files).then(items => {
    const time = new Date().getTime() - start;
    emitter.taskDone(items, time);
  });
});
