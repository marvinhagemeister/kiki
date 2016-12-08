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

    return build(config, false)(sources)
      .then(files => {
        t.deepEqual(files, []);
      });
  });

  it("should compile scss files to css", () => {
    const sources: IFile[] = [{
      base: "fixtures/",
      location: "src/__tests__/fixtures/main.scss",
      map: null,
    }];

    return build(config, false)(sources)
      .then(files => {
        t.deepEqual(files, [{
          base: "fixtures/",
          content: "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody {\n  background: red; }\n",
          location: path.join(process.cwd() + "/tmp/fixtures/main.css"),
          map: null,
        }]);
      });
  });

  it("should should generate sourcemaps", () => {
    const sources: IFile[] = [{
      base: "fixtures/",
      location: "src/__tests__/fixtures/main.scss",
      map: true,
    }];

    return build(config, false)(sources)
      .then(files => {
        t.deepEqual(files, [{
          base: "fixtures/",
          content: "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody {\n  background: "
            + "red; }\n/*# sourceMappingURL=main.css.map */",
          location: path.join(process.cwd() + "/tmp/fixtures/main.css"),
          map: {
            file: "main.css",
            mappings: "AAAA;EACE,gBAAgB,EACjB;;ACFD;EACE,YAAY,EACb;;ACCD;EACE,gBAAgB,EACjB",
            names: [],
            sources: [
              "tmp/src/__tests__/fixtures/components/_a.scss",
              "tmp/src/__tests__/fixtures/_b.scss",
              "tmp/src/__tests__/fixtures/main.scss",
            ],
            version: 3,
          },
        }]);
      });
  });

  it("should add vendor prefixes", () => {
    config.addVendorPrefixes = true;

    const sources: IFile[] = [{
      base: "fixtures/",
      location: "src/__tests__/fixtures/prefix-me.scss",
      map: true,
    }];

    return build(config, false)(sources)
      .then(files => {
        t.deepEqual(files, [{
          base: "fixtures/",
          content: "body {\n  display: -webkit-box;\n  display: -webkit-flex;\n  "
           + "display: -ms-flexbox;\n  display: flex; }\n/*# sourceMappingURL=prefix-me.css.map */",
          location: path.join(process.cwd() + "/tmp/fixtures/prefix-me.css"),
          map: {
            file: "prefix-me.css",
            mappings: "AAAA;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc,EACf",
            names: [],
            sources: [
              "tmp/src/__tests__/fixtures/prefix-me.scss",
            ],
            version: 3,
          },
        }]);
      });
  });

  it("should not add vendor prefixes", () => {
    config.addVendorPrefixes = false;

    const sources: IFile[] = [{
      base: "fixtures/",
      location: "src/__tests__/fixtures/prefix-me.scss",
      map: true,
    }];

    return build(config, false)(sources)
      .then(files => {
        t.deepEqual(files, [{
          base: "fixtures/",
          content: "body {\n  display: flex; }\n/*# sourceMappingURL=prefix-me.css.map */",
          location: path.join(process.cwd() + "/tmp/fixtures/prefix-me.css"),
          map: {
            file: "prefix-me.css",
            mappings: "AAAA;EACE,cAAc,EACf",
            names: [],
            sources: [
              "tmp/src/__tests__/fixtures/prefix-me.scss",
            ],
            version: 3,
          },
        }]);
      });
  });

  it("should throw an error on invalid scss", () => {
    const sources: IFile[] = [{
      base: "invalid-fixtures/",
      location: "src/__tests__/invalid-fixtures/invalid.scss",
      map: null,
    }];

    return build(config, false)(sources)
      .then(() => t.fail())
      .catch(err => {
        t.isTrue(err.message.indexOf("no mixin named whatever") > -1);
      });
  });
});
