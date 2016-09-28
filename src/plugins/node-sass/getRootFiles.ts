import { IFile } from "../../io/file";
import * as path from "path";
import { parseDir } from "sass-graph";

export function getRootFiles(searchPath: string, modified: IFile): IFile[] {
  const location = modified.location;
  const graph = parseDir(searchPath);

  const node = graph.index[path.resolve(location)];
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
