import { IFile } from "../../io/file";
import { IKikiSassConfig } from "../../plugins/node-sass/index";
import { build } from "../sass";
import { assert as t } from "chai";
import * as path from "path";

const config: IKikiSassConfig = {
  dest: "tmp/",
  src: "src/__tests__/fixtures/",
};

describe("sass task", () => {
  it("should return an empty array when no files are found", () => {
    const sources: IFile[] = [];

    return build(config, false)(sources).then(files => {
      t.deepEqual(files, []);
    });
  });

  it("should compile scss files to css", () => {
    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/main.scss",
        map: null,
      },
    ];

    return build(config, false)(sources).then(files => {
      t.deepEqual(files, [
        {
          base: ".",
          content:
            "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody {\n  background: red; }\n",
          location: path.join(process.cwd() + "/tmp/main.css"),
          map: null,
        },
      ]);
    });
  });

  it("should should generate sourcemaps", () => {
    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/main.scss",
        map: true,
      },
    ];

    return build(config, false)(sources).then(files => {
      t.deepEqual(files, [
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
  });

  it("should add vendor prefixes", () => {
    config.addVendorPrefixes = true;

    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/prefix-me.scss",
        map: true,
      },
    ];

    return build(config, false)(sources).then(files => {
      t.deepEqual(files, [
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
  });

  it("should not add vendor prefixes", () => {
    config.addVendorPrefixes = false;

    const sources: IFile[] = [
      {
        base: ".",
        location: "src/__tests__/fixtures/prefix-me.scss",
        map: true,
      },
    ];

    return build(config, false)(sources).then(files => {
      t.deepEqual(files, [
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
  });

  it("should throw an error on invalid scss", () => {
    const sources: IFile[] = [
      {
        base: "invalid-fixtures/",
        location: "src/__tests__/invalid-fixtures/invalid.scss",
        map: null,
      },
    ];

    return build(config, false)(sources)
      .then(() => t.fail())
      .catch(err => {
        t.isTrue(err.message.indexOf("no mixin named whatever") > -1);
      });
  });
});
