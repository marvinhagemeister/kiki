import * as Emitter from "./Emitter";
import { IFile } from "./interfaces";
import { compile, filterSass } from "./plugins/node-sass";
import * as glob from "glob";

function fileFromMatch(matches: string[], options: Object): IFile[] {
  return matches.map(match => {
    let nFile: IFile = {
      dest: null,
      location: match,
      map: null,
    };

    return Object.assign(nFile, options);
  });
}

const globOptions = { follow: true, ignore: "**/_*" };
glob("test/fixtures/*.scss", globOptions, (err, matches) => {
  const config = {
    dest: "tmp/",
    src: "scss/",
  };

  Emitter.start("sass", config.src);

  const files = fileFromMatch(matches, config);
  console.log(files);

  // return Promise.resolve(files)
  //   .then(filterSass({
  //     searchPath: config.src,
  //   }))
  //   .then(compile())
  //   .catch((ex: Error) => {
  //     Emitter.error(ex);
  //   });
});
