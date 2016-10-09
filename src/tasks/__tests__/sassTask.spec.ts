import { buildSass } from "../index";
import { assert as t } from "chai";
import "mocha";

describe("SassTask", () => {
  it("should do nothing with no files", () => {
    const files: string[] = [];
    const options = {
      sass: {
        dest: "/tmp",
        src: "/tmp",
      },
    };

    buildSass(files, options, /* isProduction */ false);
  });

  it.skip("should build in development mode", () => {
    // TODO
  });

  it.skip("should build in production", () => {
    // TODO
  });

  it.skip("should build with sourcemaps", () => {
    // TODO
  });

  it.skip("should build without sourcemaps", () => {
    // TODO
  });

  it.skip("should add prefixes", () => {
    // TODO
  });
});
