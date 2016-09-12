import { build } from "./tasks/build";

const config = {
  sass: {
    dest: "tmp/",
    src: "test/fixtures/",
  }
};

build(config);