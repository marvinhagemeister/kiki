import { Task } from "../task";
import { assert as t } from "chai";
import "mocha";
import * as sinon from "sinon";

describe("Task", () => {
  it("throw error if not subclassed", () => {
    const options = {
      dest: __dirname + "/tmp/out",
      files: ["asdf"],
      src: __dirname + "/tmp/",
    };

    const task = new Task(options);
    return task.run()
      .catch(err => t.isTrue(true));
  });

  it("should be able to set a logger", () => {
    const options = {
      dest: __dirname + "/tmp/out",
      files: ["asdf"],
      src: __dirname + "/tmp/",
    };

    const task = new Task(options);
    task.logger = () => "";
    t.isTrue(true);
  });

  it("run without files", () => {
    const options = {
      dest: __dirname + "/tmp/out",
      files: ["asdf"],
      src: __dirname + "/tmp/",
    };

    const task = new Task(options);
    task._process = () => null;

    return task.run()
      .catch(err => t.fail());
  });

  it("run with files", () => {
    const options = {
      dest: __dirname + "/tmp/out",
      files: ["asdf"],
      src: __dirname + "/tmp/",
    };

    const task = new Task(options);
    task._process = () => null;

    const files = ["a", "b"];
    return task.run(files)
      .catch(err => t.fail());
  });
});
