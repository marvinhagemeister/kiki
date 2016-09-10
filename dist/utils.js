"use strict";
const path = require("path");
function replaceExtension(file, ext) {
    ext = !ext.startsWith(".") ? "." + ext : ext;
    const base = path.basename(file);
    const nFile = base.replace(path.extname(file), ext);
    return path.join(path.dirname(file), nFile);
}
exports.replaceExtension = replaceExtension;
//# sourceMappingURL=utils.js.map