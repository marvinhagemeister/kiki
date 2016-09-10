"use strict";
const path = require("path");
function replaceExtension(file, ext) {
    ext = !ext.startsWith(".") ? "." + ext : ext;
    const base = path.basename(file);
    const nFile = base.replace(path.extname(file), ext);
    return path.join(path.dirname(file), nFile);
}
exports.replaceExtension = replaceExtension;
function createLookup(array, key) {
    let lookup = {};
    for (let i = 0, len = array.length; i < len; i++) {
        lookup[array[i][key]] = array[i];
    }
    return lookup;
}
exports.createLookup = createLookup;
//# sourceMappingURL=utils.js.map