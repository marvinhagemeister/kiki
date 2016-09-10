import { IFile } from "./interfaces";
import { compile, sassInFiles } from "./plugins/node-sass";
import * as glob from "glob";

// const globOptions = { ignore: '**/_*', follow: true };
glob("test/fixtures/*.scss", (err, matches) => {

  const files = matches.map(match => {
    const nFile: IFile = {
      dest: "tmp/",
      location: match,
      map: null,
    };

    return nFile;
  });

  console.log(files);


  // return compile()(nFile);
  const res = sassInFiles(files);
  console.log(res);


});




