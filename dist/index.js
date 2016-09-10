"use strict";
const Emitter = require("./Emitter");
const glob = require("glob");
function fileFromMatch(matches, options) {
    return matches.map(match => {
        let nFile = {
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
//# sourceMappingURL=index.js.map