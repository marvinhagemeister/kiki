import * as path from "path";
import { parseDir } from "sass-graph";

export function getRootFiles(searchPath: string, file: string): string[] {
  const graph = parseDir(searchPath);

  const node = graph.index[path.resolve(file)];
  let files = typeof node !== "undefined"
    && node.importedBy.length > 0
    ? node.importedBy
    : [file];

  // Filter out partials which always start with "_"
  files = files.filter(item => !path.basename(item).startsWith("_"));

  return files;
}
