import SassTransform from "../stream";
import { assert as t } from "chai";
import { Readable } from "stream";

class MemoryStream extends Readable {
  constructor(items: string[]) {
    super({
      encoding: "utf-8",
      objectMode: true,
    });

    for (let i = 0; i < items.length; i++) {
      this.push(items[i]);
    }

    this.push({
      start: "end",
    });
  }

  public _read() {
    this.push(null);
  }
}

describe("NodeSass Stream", () => {
  it("should work", done => {
    const stream = new MemoryStream(["a", "b"]);

    stream.on("error", (err: Error) => {
      console.log(err);
    });

    stream.on("end", () => {
      console.log("__END__");
    });

    const transform = new SassTransform();
    transform.on("error", (err: Error) => {
      console.log(err);
    });

    stream
      .pipe(transform)
      .pipe(process.stdout);

    stream.push(["hey"]);

    setTimeout(() => {
      t.fail();
      done();
    }, 1000);
  });
});
