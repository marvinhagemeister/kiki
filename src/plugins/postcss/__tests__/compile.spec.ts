import { getFixture } from "../../../__tests__/helpers";
import { IFile } from "../../../io/file";
import { compile } from "../compile";
import { ICustomPostCssOptions } from "../index";
import { assert as t } from "chai";
import * as fs from "fs";

function getFile(name: string): any {
  return {
    base: __dirname + "/fixtures",
    content: fs.readFileSync(getFixture(name), "utf-8"),
    location: getFixture(name),
    map: null,
  };
}

describe("compile (postcss)", () => {
  it("should work add prefixes by default", () => {
    const file = getFile("postcss.css");
    const postCssOpts: any = {
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8
      ],
    };

    return compile(postCssOpts)(file).then((res: IFile) => {
      t.deepEqual(res, {
        base: __dirname + "/fixtures",
        content:
          "h1 {\n  display: -webkit-box;\n" +
          "  display: -ms-flexbox;\n  display: flex;\n}\n",
        location: getFixture("postcss.css"),
        map: null,
      });
    });
  });

  it("should add prefixes if 'addVendorPrefixes' is true", () => {
    const files = getFile("postcss.css");
    const postCssOpts: ICustomPostCssOptions = {
      addVendorPrefixes: true,
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8,
      ],
    };

    return compile(postCssOpts)(files).then((res: IFile) => {
      t.deepEqual(res, {
        base: __dirname + "/fixtures",
        content:
          "h1 {\n  display: -webkit-box;\n" +
          "  display: -ms-flexbox;\n  display: flex;\n}\n",
        location: getFixture("postcss.css"),
        map: null,
      });
    });
  });

  it("should not add prefixes if 'addVendorPrefixes' is false", () => {
    const files = getFile("postcss.css");
    const postCssOpts: ICustomPostCssOptions = {
      addVendorPrefixes: false,
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9", // screw IE8
      ],
    };

    return compile(postCssOpts)(files).then((res: IFile) => {
      t.deepEqual(res, {
        base: __dirname + "/fixtures",
        content: "h1 {\n  display: flex;\n}\n",
        location: getFixture("postcss.css"),
        map: null,
      });
    });
  });

  it("should add future features if 'cssnext' is true", () => {
    const files = getFile("cssnext.css");
    const postCssOpts: any = {
      browsers: null,
      cssnext: true,
    };

    return compile(postCssOpts)(files).then((res: any) => {
      t.deepEqual(res, {
        base: __dirname + "/fixtures",
        content:
          ".one {\n  background-color: brown;\n}\n\n.two {\n  " +
          "background-color: brown;\n}\n",
        location: getFixture("cssnext.css"),
        map: null,
      });
    });
  });

  it("should add future features if 'cssnext' is false", () => {
    const files = getFile("cssnext.css");
    const postCssOpts: any = {
      browsers: null,
      cssnext: false,
    };

    return compile(postCssOpts)(files).then((res: IFile) => {
      t.deepEqual(res, {
        base: __dirname + "/fixtures",
        content:
          ":root {\n  --main-bg-color: brown;\n}\n\n.one {\n  " +
          "background-color: var(--main-bg-color);\n}\n\n.two {\n  " +
          "background-color: var(--main-bg-color);\n}\n",
        location: getFixture("cssnext.css"),
        map: null,
      });
    });
  });
});
