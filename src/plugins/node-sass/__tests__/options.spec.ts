import { IFile2 } from "../../../io/file";
import { optionsToLibsass } from "../options";
import { Buffer } from "buffer";
import { assert as t } from "chai";
import "mocha";
import { Options } from "node-sass";

describe("NodeSass Options", () => {
  it("should get options without sourcemaps", () => {
    const file: IFile2 = {
      content: Buffer.from("Hello World"),
      location: "/tmp/whatever.scss",
      map: false,
    };

    const options: Options = {
      outputStyle: "compressed",
    };

    t.deepEqual(optionsToLibsass(options, file), {
      data: "Hello World",
      file: null,
      outFile: "/tmp/whatever.css",
      outputStyle: "compressed",
    });
  });

  it("should get options with sourcemaps", () => {
    const file: IFile2 = {
      content: Buffer.from("Hello World"),
      location: "/tmp/whatever.scss",
      map: true,
    };

    const options: Options = {
      outputStyle: "compressed",
    };

    t.deepEqual(optionsToLibsass(options, file), {
      data: "Hello World",
      file: null,
      outFile: "/tmp/whatever.css",
      outputStyle: "compressed",
      sourceMap: "/tmp/whatever.css.map",
      sourceMapRoot: "/tmp",
    });
  });

  it("should throw when it receives a file with undefined content", () => {
    const file: IFile2 = {
      location: "/tmp/whatever.scss",
      map: true,
    };

    const options: Options = {
      outputStyle: "compressed",
    };

    t.throws(() => {
      optionsToLibsass(options, file)
    });
  });
});
