import * as emitter from "../emitter";
import { filesFromMatch } from "../utils";
import { build as sass } from "./sass";
import * as Promise from "bluebird";
import * as glob from "glob";

process.env.NODE_ENV = "production";

const config = {
  dest: "tmp/",
  src: "test/fixtures/",
};

// Sass
export function sass() {
  const globOptions = { follow: true, ignore: "**/_*" };
  glob(config.src + "*.scss", globOptions, (err, matches) => {
    emitter.start("sass", config.src);

    const files = filesFromMatch(matches);
    return sass(files);
  });
}

export function build() {
  return Promise.all(sass());
}
