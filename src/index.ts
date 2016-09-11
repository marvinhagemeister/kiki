import * as emitter from "./emitter";
import { build } from "./tasks/build";
import { filesFromMatch } from "./utils";
import * as glob from "glob";

const config = {
  sass: {
    dest: "tmp/",
    src: "test/fixtures/",
  }
};

build(config);