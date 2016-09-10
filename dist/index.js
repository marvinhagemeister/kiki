"use strict";
const node_sass_1 = require("./plugins/node-sass");
const glob = require("glob");
// const globOptions = { ignore: '**/_*', follow: true };
glob("test/fixtures/*.scss", (err, matches) => {
    const files = matches.map(match => {
        const nFile = {
            dest: "tmp/",
            location: match,
            map: null,
        };
        return nFile;
    });
    console.log(files);
    // return compile()(nFile);
    const res = node_sass_1.sassInFiles(files);
    console.log(res);
});
//# sourceMappingURL=index.js.map