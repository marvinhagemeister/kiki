import { assert as t } from "chai";
import { spawn } from "cross-spawn";
import * as path from "path";

describe("build task", () => {
  it("should exit 1 on compilation error", done => {
    const args = [
      require.resolve("../../../bin/kiki"),
      "build",
      "--config",
      path.resolve(__dirname, "fixtures/config.json"),
    ];
    const child = spawn("node", args);

    child.on("exit", (code: number, signal: string) => {
      t.equal(code, 1);
      done();
    });
  });
});
