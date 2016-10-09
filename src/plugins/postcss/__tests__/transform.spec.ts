import { IFile2, SourceMap } from "../../../io/file";
import MemoryStream from "../../../streams/memory-stream";
import MemoryWriter from "../../../streams/memory-writer";
import { PostCssTransform } from "../transform";
import * as autoprefixer from "autoprefixer";
import { Buffer } from "buffer";
import { assert as t } from "chai";
import "mocha";

const prefixerOptions = {
  browsers: [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie < 9", // screw IE8
  ],
  remove: false, // makes autoprefixer 10% faster
};

const plugins = [autoprefixer(prefixerOptions)];

const errorHandler = (err: Error) => {
  /* tslint:disable no-console */
  console.log(err);
  /* tslint:enable no-console */
};

describe("PostCSS Stream", () => {
  it("should compile without sourcemaps", () => {
    const stream = new MemoryStream();
    const postcss = new PostCssTransform(plugins);
    const writer = new MemoryWriter((file: IFile2) => {
      t.equal(file.content.toString(), "body { color: red; display: "
        + "-webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; }");
      t.equal(file.location, "/tmp/whatever.css");
      t.equal(file.map, false);
    });

    stream.on("error", errorHandler);
    postcss.on("error", errorHandler);
    writer.on("error", errorHandler);

    stream.push({
      content: Buffer.from("body { color: red; display: flex; }"),
      location: "/tmp/whatever.css",
      map: false,
    });

    stream
      .pipe(postcss)
      .pipe(writer);
  });

  it("should compile with sourcemaps", done => {
    const stream = new MemoryStream();
    const postcss = new PostCssTransform(plugins);
    const writer = new MemoryWriter((file: IFile2) => {
      try {
        t.equal(file.content.toString(), "body { color: red; }");
        t.equal(file.location, "/tmp/whatever.css");

        const map = JSON.parse(file.map.toString());
        t.equal(map.version, 3);
        t.equal(map.file, "whatever.css");
        t.equal(map.sources.length, 1);
        t.isTrue(map.mappings.length > 1);
        done();
      } catch (err) {
        done(err);
      }
    });

    stream.on("error", errorHandler);
    postcss.on("error", errorHandler);
    writer.on("error", errorHandler);

    const sampleMap: SourceMap = {
      file: "whatever.css",
      mappings: "AAA2B,AAAA,IAAI,AAAC,CAApB,KAAK,CAAE,GAAI,CAA0B",
      names: [],
      sourceRoot: "/tmp",
      sources: ["../Users/marvinhagemeister/dev/github/kiki/stdin"],
      version: 3,
    };

    stream.push({
      content: Buffer.from("body { color: red; }"),
      location: "/tmp/whatever.css",
      map: sampleMap,
    });

    stream
      .pipe(postcss)
      .pipe(writer);
  });
});
