import * as Emitter from "../../emitter";
import { IFile } from "../../io/file";
import { SassOptions, optionsToLibsass } from "./options";
import { resultToFile } from "./result";
import * as Promise from "bluebird";
import { Result, SassError, render } from "node-sass";

const sassRender = Promise.promisify(render);

export function compile(opts: SassOptions) {
  opts = opts || {};

  return (files: IFile[]) => {
    return Promise.all(
      files.map(file => {
        opts = optionsToLibsass(opts, file);
        return file;
        // return sassRender(opts).then((res: Result) => {
        //   return resultToFile(res, file);
        // }).catch((err: SassError) => {
        //   Emitter.error(err);
        // });
      })
    );
  };
}
