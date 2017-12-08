import { IFile } from "../../io/file";
import { IKikiSassConfig } from "../../plugins/node-sass/index";
import { build } from "../sass";
import * as path from "path";

const config: IKikiSassConfig = {
  dest: "tmp/",
  src: "src/__tests__/fixtures/",
};

describe("sass task", () => {
  it("should return an empty array when no files are found", async () => {
    const sources: IFile[] = [];

    const files = await build(config, false)(sources);
    expect(files).toEqual([]);
  });

  it("should compile scss files to css", async () => {
    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/main.scss",
        map: null,
      },
    ];

    const files = await build(config, false)(sources);
    expect(files).toEqual([
      {
        base: ".",
        content:
          "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody {\n  background: red; }\n",
        location: path.join(process.cwd() + "/tmp/main.css"),
        map: null,
      },
    ]);
  });

  it("should should generate sourcemaps", async () => {
    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/main.scss",
        map: true,
      },
    ];

    const files = await build(config, false)(sources);
    expect(files).toEqual([
      {
        base: ".",
        content:
          "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody {\n  background: " +
          "red; }\n/*# sourceMappingURL=main.css.map */",
        location: path.join(process.cwd() + "/tmp/main.css"),
        map: {
          file: "main.css",
          mappings:
            "AAAA;EACE,gBAAe,EAChB;;ACFD;EACE,YAAW,EACZ;;ACCD;EACE,gBAAe,EAChB",
          names: [],
          sources: [
            "tmp/src/__tests__/fixtures/components/_a.scss",
            "tmp/src/__tests__/fixtures/_b.scss",
            "tmp/src/__tests__/fixtures/main.scss",
          ],
          version: 3,
        },
      },
    ] as any);
  });

  it("should add vendor prefixes", async () => {
    config.addVendorPrefixes = true;

    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/prefix-me.scss",
        map: true,
      },
    ];

    const files = await build(config, false)(sources);
    expect(files).toEqual([
      {
        base: ".",
        content:
          "body {\n  display: -webkit-box;\n  " +
          "display: -ms-flexbox;\n  display: flex; }\n/*# sourceMappingURL=prefix-me.css.map */",
        location: path.join(process.cwd() + "/tmp/prefix-me.css"),
        map: {
          file: "prefix-me.css",
          mappings: "AAAA;EACE,qBAAa;EAAb,qBAAa;EAAb,cAAa,EACd",
          names: [],
          sources: ["tmp/src/__tests__/fixtures/prefix-me.scss"],
          version: 3,
        },
      },
    ] as any);
  });

  it("should not add vendor prefixes", async () => {
    config.addVendorPrefixes = false;

    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/prefix-me.scss",
        map: true,
      },
    ];

    const files = await build(config, false)(sources);
    expect(files).toEqual([
      {
        base: ".",
        content:
          "body {\n  display: flex; }\n/*# sourceMappingURL=prefix-me.css.map */",
        location: path.join(process.cwd() + "/tmp/prefix-me.css"),
        map: {
          file: "prefix-me.css",
          mappings: "AAAA;EACE,cAAa,EACd",
          names: [],
          sources: ["tmp/src/__tests__/fixtures/prefix-me.scss"],
          version: 3,
        },
      },
    ] as any);
  });

  it("should throw an error on invalid scss", async () => {
    const sources: IFile[] = [
      {
        base: "invalid-fixtures/",
        location: "src/__tests__/invalid-fixtures/invalid.scss",
        map: null,
      },
    ];

    try {
      await build(config, false)(sources);
      throw new Error("fail");
    } catch (err) {
      expect(err.message.indexOf("no mixin named whatever") > -1).toEqual(true);
    }
  });
});
