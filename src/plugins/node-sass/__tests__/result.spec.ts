import { IFile2, SourceMap } from "../../../io/file";
import { resultToFile } from "../result";
import { Buffer } from "buffer";
import { assert as t } from "chai";
import "mocha";
import { Result } from "node-sass";

describe("NodeSass Result", () => {
  it("should convert sass result to IFile2 without sourcemaps", () => {
    const file: IFile2 = {
      content: Buffer.from("Hello World"),
      location: "/tmp/whatever.scss",
      map: false,
    };

    const result: Result = {
      css: Buffer.from("Hello"),
      map: undefined,
      stats: {
        duration: 4,
        end: 1475942395989,
        entry: "data",
        includedFiles: [],
        start: 1475942395985,
      },
    };

    const actual = resultToFile(result, file);

    t.equal(actual.location, "/tmp/whatever.css");
    t.equal(actual.map, false);
    t.equal(actual.content.toString(), "Hello");
  });

  it("should convert sass result to IFile2 with sourcemaps", () => {
    const file: IFile2 = {
      content: Buffer.from("Hello World"),
      location: "/tmp/whatever.scss",
      map: Buffer.from("{}"),
    };

    const result: Result = {
      css: Buffer.from("Hello"),
      map: undefined,
      stats: {
        duration: 4,
        end: 1475942395989,
        entry: "data",
        includedFiles: [],
        start: 1475942395985,
      },
    };

    const actual = resultToFile(result, file);

    t.equal(actual.location, "/tmp/whatever.css");
    t.equal(actual.map.toString(), "{}");
    t.equal(actual.content.toString(), "Hello");
  });

  it("should fix mappings", () => {
    const map: SourceMap = {
      file: "whatever.css",
      mappings: "AAA2B,AAAA,IAAI,AAAC,CAApB,KAAK,CAAE,GAAI,CAA0B",
      names: [],
      sourceRoot: "/tmp",
      sources: [
        "../my/path/stdin",
      ],
      version: 3,
    };

    const file: IFile2 = {
      content: Buffer.from("Hello World"),
      location: "/tmp/whatever.scss",
      map: Buffer.from(JSON.stringify(map)),
    };

    const result: Result = {
      css: Buffer.from("Hello"),
      map: undefined,
      stats: {
        duration: 4,
        end: 1475942395989,
        entry: "data",
        includedFiles: [],
        start: 1475942395985,
      },
    };

    const actual = resultToFile(result, file);

    t.equal(actual.location, "/tmp/whatever.css");
    t.deepEqual(JSON.parse(actual.map.toString()), map);
    t.equal(actual.content.toString(), "Hello");
  });
});
