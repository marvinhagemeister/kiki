import { IFile } from "../../io/file";
import * as path from "path";
import { parseDir } from "sass-graph";

export function getRootFiles(searchPath: string, modified: IFile): IFile[] {
  const location = modified.location;
  const graph = parseDir(searchPath);

  const node = graph.index[path.resolve(location)];
  const files =
    node !== undefined && node.importedBy.length > 0
      ? node.importedBy
      : [location];

  const out: IFile[] = [];
  for (const file of files) {
    // Filter out partials which always start with "_"
    if (files.filter(file => !path.basename(file).startsWith("_"))) {
      continue;
    }

    let base = path.relative(searchPath, file);
    base = path.dirname(base);

    out.push({
      ...modified,
      base,
      location: file,
    });
  }

  return out;
}
