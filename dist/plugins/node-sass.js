"use strict";
const Emitter = require("../emitter");
const utils_1 = require("../utils");
const Promise = require("bluebird");
const node_sass_1 = require("node-sass");
const path = require("path");
const sass_graph_1 = require("sass-graph");
const sass = Promise.promisify(node_sass_1.render);
function getRootFiles(searchPath, modified) {
    const { location } = modified;
    const graph = sass_graph_1.parseDir(searchPath);
    const node = graph.index[location];
    const files = typeof node !== "undefined"
        && node.importedBy.length > 0
        ? node.importedBy
        : [location];
    return files.map(file => {
        return Object.assign({}, modified, {
            location: file,
        });
    });
}
exports.getRootFiles = getRootFiles;
function filterSass(opts) {
    if (!opts.searchPath) {
        throw new Error("Sass Plugin didn't receive a search path");
    }
    return (files) => {
        const lookup = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!/\.scss$/.test(file.location)) {
                continue;
            }
            if (!/_\w+\.scss$/.test(file.location)) {
                lookup.push(file.location);
            }
            getRootFiles(opts.searchPath, file).forEach(item => {
                if (lookup.indexOf(item.location) === -1) {
                    files.push(item);
                    lookup.push(item.location);
                }
            });
        }
        return files.filter(file => !/_\w+\.scss$/.test(file.location));
    };
}
exports.filterSass = filterSass;
function compile(opts) {
    opts = opts || {};
    return (file) => {
        const filename = path.basename(file.location);
        const out = path.join(file.dest, filename);
        opts.outFile = utils_1.replaceExtension(out, "css");
        if (file.map !== null) {
            opts.sourceMap = utils_1.replaceExtension(filename, "css.map");
        }
        if (file.content) {
            opts.data = file.content;
            opts.file = null;
        }
        else {
            opts.file = file.location;
            opts.data = null;
        }
        return sass(opts).then((res) => {
            file.content = res.css.toString();
            if (file.map !== null) {
                file.map = JSON.stringify(res.map.toString());
            }
            return file;
        }).catch((err) => {
            Emitter.error(err);
        });
    };
}
exports.compile = compile;
//# sourceMappingURL=node-sass.js.map