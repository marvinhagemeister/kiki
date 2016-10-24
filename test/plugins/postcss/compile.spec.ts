import { IFile } from "../../../src/io/file";
import { compile } from "../../../src/plugins/postcss/compile";
import { ICustomPostCssOptions } from "../../../src/plugins/postcss/index";
import { getFixture } from "../../helpers";
import { assert as t } from "chai";
import * as fs from "fs";
import "mocha";

function getFiles(name: string): IFile[] {
  return [{
    content: fs.readFileSync(getFixture(name), "utf-8"),
    location: getFixture(name),
    map: null,
  }];
}

describe("compile (postcss)", () => {
  it("should work add prefixes by default", () => {
    const files = getFiles("postcss.css");
    const postCssOpts: ICustomPostCssOptions = {
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8
      ],
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        content: "h1 {\n  display: -webkit-box;\n  display: -webkit-flex;\n"
        + "  display: -ms-flexbox;\n  display: flex;\n}\n",
        location: getFixture("postcss.css"),
        map: null,
      }]);
    });
  });

  it("should add prefixes if 'addVendorPrefixes' is true", () => {
    const files = getFiles("postcss.css");
    const postCssOpts: ICustomPostCssOptions = {
      addVendorPrefixes: true,
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8,
      ],
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        content: "h1 {\n  display: -webkit-box;\n  display: -webkit-flex;\n"
        + "  display: -ms-flexbox;\n  display: flex;\n}\n",
        location: getFixture("postcss.css"),
        map: null,
      }]);
    });
  });

  it("should not add prefixes if 'addVendorPrefixes' is false", () => {
    const files = getFiles("postcss.css");
    const postCssOpts: ICustomPostCssOptions = {
      addVendorPrefixes: false,
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8
      ],
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        content: "h1 {\n  display: flex;\n}\n",
        location: getFixture("postcss.css"),
        map: null,
      }]);
    });
  });

  it("should add future features if 'cssnext' is true", () => {
    const files = getFiles("cssnext.css");
    const postCssOpts: ICustomPostCssOptions = {
      browsers: null,
      cssnext: true,
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        content: ".one {\n  background-color: brown;\n}\n\n.two {\n  "
          + "background-color: brown;\n}\n",
        location: getFixture("cssnext.css"),
        map: null,
      }]);
    });
  });

  it("should add future features if 'cssnext' is false", () => {
    const files = getFiles("cssnext.css");
    const postCssOpts: ICustomPostCssOptions = {
      browsers: null,
      cssnext: false,
    };

    return compile(postCssOpts)(files).then(res => {
      t.deepEqual(res, [{
        content: ":root {\n  --main-bg-color: brown;\n}\n\n.one {\n  "
          + "background-color: var(--main-bg-color);\n}\n\n.two {\n  "
          + "background-color: var(--main-bg-color);\n}\n",
        location: getFixture("cssnext.css"),
        map: null,
      }]);
    });
  });
});
