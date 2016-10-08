import { IFile2 } from "../../../io/file";
import MemoryStream from "../../../streams/memory-stream";
import MemoryWriter from "../../../streams/memory-writer";
import SassTransform from "../stream";
import { Buffer } from "buffer";
import { assert as t } from "chai";
import "mocha";

const errorHandler = (err: Error) => {
  console.log(err);

  t.fail(err);
};

describe("NodeSass Stream", () => {
  it("should compile without sourcemaps", () => {
    const stream = new MemoryStream();
    const sass = new SassTransform({ outputStyle: "compressed" });
    const writer = new MemoryWriter((file: IFile2) => {
      t.equal(file.content.toString(), "body{color:red}\n");
      t.equal(file.location, "/tmp/whatever.css");
      t.equal(file.map, false);
    });

    stream.on("error", errorHandler);
    sass.on("error", errorHandler);
    writer.on("error", errorHandler);

    stream.push({
      content: Buffer.from("@mixin yo { color: red; } body { @include yo; }"),
      location: "/tmp/whatever.scss",
      map: false,
    });

    stream
      .pipe(sass)
      .pipe(writer);
  });

  it("should compile with sourcemaps", done => {
    const stream = new MemoryStream();
    const sass = new SassTransform({ outputStyle: "compressed" });
    const writer = new MemoryWriter((file: IFile2) => {
      t.equal(file.content.toString(), "body{color:red}\n\n/*# sourceMappingURL=whatever.css.map */");
      t.equal(file.location, "/tmp/whatever.css");

      const map = JSON.parse(file.map.toString());
      t.equal(map.version, 3);
      t.equal(map.file, "whatever.css");
      t.equal(map.sourceRoot, "/tmp");
      t.equal(map.sources.length, 1);
      t.isTrue(map.mappings.length > 1);
      done();
    });

    stream.on("error", errorHandler);
    sass.on("error", errorHandler);
    writer.on("error", errorHandler);

    stream.push({
      content: Buffer.from("@mixin yo { color: red; } body { @include yo; }"),
      location: "/tmp/whatever.scss",
      map: true,
    });

    stream
      .pipe(sass)
      .pipe(writer);
  });

  it.skip("should handle compilation errors", () => {
    // TODO
  });
});
