import { IFile } from "../../interfaces";
import { parseDir } from "sass-graph";

export function getRootFiles(searchPath: string, modified: IFile): IFile[] {
  const { location } = modified;
  const graph = parseDir(searchPath);

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
