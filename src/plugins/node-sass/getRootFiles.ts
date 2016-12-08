import * as Emitter from "../../emitter";
import { IFile } from "../../io/file";
import * as path from "path";
import { parseDir } from "sass-graph";

export function getRootFiles(searchPath: string, modified: IFile): IFile[] {
  const location = modified.location;
  const graph = parseDir(searchPath);

  const node = graph.index[path.resolve(location)];
  let files = typeof node !== "undefined"
    && node.importedBy.length > 0
    ? node.importedBy
    : [location];

  // Filter out partials which always start with "_"
  files = files.filter(file => !path.basename(file).startsWith("_"));

  if (files.length === 0) {
    Emitter.noFilesOrOnlyPartials();
  }

  return files.map(file => {
    let base = path.relative(searchPath, file);
    base = path.dirname(base);

    return Object.assign({}, modified, {
      base,
      location: file,
    });
  });
}
