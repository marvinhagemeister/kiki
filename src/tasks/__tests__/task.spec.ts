import task from "../task";
import { assert as t } from "chai";
import "mocha";

describe("task", () => {
  it("should return an empty array when no files are found", () => {
    return task("src/__tests__/fixtures/**.whatever", "", "testTask")
      .then(files => {
        t.deepEqual(files, []);
      });
  });

  it("should return file matches", () => {
    return task("src/__tests__/fixtures/post*.css", "", "testTask")
      .then(files => {
        t.deepEqual(files, [{
          base: "src/__tests__/fixtures",
          location: "src/__tests__/fixtures/postcss.css",
          map: null,
        }]);
      });
  });

  it("should return relative filePaths", () => {
    return task("src/__tests__/fixtures/post*.css", "src/__tests__/", "testTask")
      .then(files => {
        t.deepEqual(files, [{
          base: "fixtures",
          location: "src/__tests__/fixtures/postcss.css",
          map: null,
        }]);
      });
  });
});
