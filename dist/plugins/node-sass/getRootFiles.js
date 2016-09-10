"use strict";
const utils_1 = require("../../utils");
const Promise = require("bluebird");
const node_sass_1 = require("node-sass");
const path = require("path");
const sass_graph_1 = require("sass-graph");
const sass = Promise.promisify(node_sass_1.render);
function getRootFiles(modified) {
    const { location } = modified;
    const src = path.dirname(location);
    const graph = sass_graph_1.parseDir(src, {
        loadPaths: src,
    });
    const node = graph.index[location];
    const files = node.importedBy.length > 0
        ? node.importedBy
        : [location];
    return files.map(file => {
        modified.location = file;
        return modified;
    });
}
exports.getRootFiles = getRootFiles;
function sassInFiles(files) {
    return files.forEach((file, i) => {
        if (/\.scss$/.test(file.location)) {
            files.splice(i, 1);
            console.log(files);
            getRootFiles(file).forEach(item => {
                return files.push(item);
            });
        }
    });
}
exports.sassInFiles = sassInFiles;
function compile(options) {
    options = options || {};
    return (file) => {
        const filename = path.basename(file.location);
        const out = path.join(file.dest, filename);
        options.outFile = utils_1.replaceExtension(out, "css");
        if (file.map !== null) {
            options.sourceMap = utils_1.replaceExtension(filename, "css.map");
        }
        if (file.content) {
            options.data = file.content;
            options.file = null;
        }
        else {
            options.file = file.location;
            options.data = null;
        }
        console.log(options);
        console.log("render");
        return sass(options).then((res) => {
            file.content = res.css.toString();
            if (file.map !== null) {
                file.map = JSON.stringify(res.map.toString());
            }
            return file;
        }).catch((err) => {
            console.log("whaaat");
            console.log(err);
        });
    };
}
exports.compile = compile;
//# sourceMappingURL=getRootFiles.js.map