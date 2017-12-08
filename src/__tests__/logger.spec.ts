import { Logger } from "../logger";
import { StubLogger } from "./helpers";

describe("Logger", () => {
  const stub = new StubLogger();
  const l = new Logger(stub);

  afterEach(() => (stub._output = ""));

  it("should start", () => {
    l.start("foo", "/my/path");
    expect(stub.output).toMatchSnapshot();
  });

  it("should watch", () => {
    l.watch(["/foo", "/my/path"]);
    expect(stub.output).toMatchSnapshot();
  });

  it("should nothing to do", () => {
    l.nothingToDo();
    expect(stub.output).toMatchSnapshot();
  });

  it("should time", () => {
    l.time("/foo", 123);
    expect(stub.output).toMatchSnapshot();
  });

  it("should invalidJson", () => {
    l.invalidJson("nope", "/foo");
    expect(stub.output).toMatchSnapshot();
  });

  it("should noFilesOrOnlyPartials", () => {
    l.noFilesOrOnlyPartials();
    expect(stub.output).toMatchSnapshot();
  });

  it("should warning", () => {
    l.warning("foo");
    expect(stub.output).toMatchSnapshot();
  });

  it("should success", () => {
    l.success("foo");
    expect(stub.output).toMatchSnapshot();
  });

  it("should taskDone", () => {
    l.taskDone(
      [{ base: "foo", content: "content", location: "log", map: "map" }],
      123,
    );
    expect(stub.output).toMatchSnapshot();
  });

  it("should change", () => {
    l.change("foo", "/foo");
    expect(stub.output).toMatchSnapshot();
  });
});
