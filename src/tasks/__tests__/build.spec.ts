import { build, buildSass } from "../build";
import * as path from "path";

describe("buildSass", () => {
  it("should build do nothing when no files are found", () => {
    const config = {
      dest: path.join(process.cwd(), "tmp/"),
      src: path.join(process.cwd(), "src/__tests__/fixtures/empty"),
    };

    return buildSass(config, false).then(files => {
      expect(files).toEqual([]);
    });
  });

  it("should build scss files", () => {
    const config = {
      dest: path.join(process.cwd(), "tmp/"),
      src: path.join(process.cwd(), "src/__tests__/fixtures"),
    };

    return buildSass(config, false).then(files => {
      expect(files).toEqual([
        {
          base: "components",
          content: ".this-is-deep {\n  color: red; }\n",
          location: path.join(process.cwd(), "/tmp/components/deep-nested.css"),
          map: null,
        },
        {
          base: ".",
          content: ".this-is-deep {\n  color: red; }\n",
          location: path.join(process.cwd(), "/tmp/deep.css"),
          map: null,
        },
        {
          base: ".",
          content:
            "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody {\n  background: red; }\n",
          location: path.join(process.cwd(), "/tmp/main.css"),
          map: null,
        },
        {
          base: ".",
          content: "body {\n  color: blue; }\n\nh2 {\n  background: red; }\n",
          location: path.join(process.cwd(), "/tmp/main2.css"),
          map: null,
        },
        {
          base: ".",
          content:
            "body {\n  display: -webkit-box;\n  display: " +
            "-ms-flexbox;\n  display: flex; }\n",
          location: path.join(process.cwd(), "/tmp/prefix-me.css"),
          map: null,
        },
        {
          base: ".",
          content: "button {\n  border-radius: 30px; }\n",
          location: path.join(process.cwd(), "/tmp/prefixes.css"),
          map: null,
        },
      ]);
    });
  });

  it("should throw an error when build fails", done => {
    const config = {
      dest: path.join(process.cwd(), "tmp/"),
      src: path.join(process.cwd(), "src/__tests__/fixtures/invalid"),
    };

    buildSass(config, false).catch(err => {
      expect(err.message.indexOf("does not exist") > -1).toEqual(true);
      done();
    });
  });
});

describe.skip("build", () => {
  it("should build everything", () => {
    const config = {
      sass: {
        dest: path.join(process.cwd(), "tmp/"),
        src: path.join(process.cwd(), "src/__tests__/fixtures/"),
      },
    };

    return build(config).then(files => {
      expect(files).toEqual([
        {
          base: "components",
          content: ".this-is-deep {\n  color: red; }\n",
          location: path.join(process.cwd(), "/tmp/components/deep-nested.css"),
          map: null,
        },
        {
          base: ".",
          content: ".this-is-deep {\n  color: red; }\n",
          location: path.join(process.cwd(), "/tmp/deep.css"),
          map: null,
        },
        {
          base: ".",
          content:
            "p {\n  font-size: 2rem; }\n\nbody {\n  color: blue; }\n\nbody {\n  background: red; }\n",
          location: path.join(process.cwd(), "/tmp/main.css"),
          map: null,
        },
        {
          base: ".",
          content: "body {\n  color: blue; }\n\nh2 {\n  background: red; }\n",
          location: path.join(process.cwd(), "/tmp/main2.css"),
          map: null,
        },
        {
          base: ".",
          content:
            "body {\n  display: -webkit-box;\n  display: " +
            "-ms-flexbox;\n  display: flex; }\n",
          location: path.join(process.cwd(), "/tmp/prefix-me.css"),
          map: null,
        },
        {
          base: ".",
          content: "button {\n  border-radius: 30px; }\n",
          location: path.join(process.cwd(), "/tmp/prefixes.css"),
          map: null,
        },
      ]);
    });
  });

  it("should build nothing if folder is empty", () => {
    const config = {
      sass: {
        dest: path.join(process.cwd(), "tmp/"),
        src: path.join(process.cwd(), "src/__tests__/fixtures/empty/"),
      },
    };

    return build(config).then(files => {
      expect(files).toEqual([]);
    });
  });

  it.skip("should exit on invalid files", done => {
    // const args = [
    // ];
    // const child = spawn("ts-node", args);
    // child.on("exit", (code: number, signal: string) => {
    //   t.equal(code, 1);
    //   done();
    // });
  });
});
