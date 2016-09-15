import { IFile } from "../../io/file";
import * as Promise from "bluebird";
import * as rollup from "rollup";
import * as babel from "rollup-plugin-babel";
import * as commonjs from "rollup-plugin-commonjs";
import * as globals from "rollup-plugin-node-globals";
import * as nodeResolve from "rollup-plugin-node-resolve";
import * as replace from "rollup-plugin-replace";
import * as uglify from "rollup-plugin-uglify";

function getPlugins(NODE_ENV: string): Array<any> {
  const plugins = [
    replace({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),
    globals(),
    nodeResolve({
      browser: true,
      jsnext: true,
      main: true,
      preferBuiltins: false,
    }),
    commonjs({
      exclude: ["node_modules/moment/**"],
      include: ["node_modules/**", "scripts/vendor/**"],
      namedExports: {
        "node_modules/jquery/dist/jquery.min.js": ["jquery"],
        "node_modules/handlebars/dist/handlebars.min.js": ["handlebars"],
      },
    }),
    babel({
      exclude: ["node_modules/**", "scripts/vendor/**"],
      runtimeHelpers: true,
    }),
  ];

  if (NODE_ENV === "production") {
    plugins.push(uglify());
  }

  return plugins;
}

interface IKikiRollupOptions {
  moduleName: string;
}

let cache = {};
export function compile(opts: IKikiRollupOptions) {
  return (files: IFile[]) => {
    return Promise.all(
      files.map(file => {
        const { location } = file;
        return rollup.rollup({
          cache: cache[location],
          entry: location,
          plugins: getPlugins(process.env.NODE_ENV),
        }).then(bundle => {
          file.content = bundle.generate({
            format: "iife",
            moduleName: opts.moduleName,
          });

          cache[location] = bundle;

          return file;
        });
      })
    );
  };
}
