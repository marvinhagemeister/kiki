declare module "sass-graph" {

  type Node = {
    imports: Array<string>;
    importedBy: Array<string>;
    modified: string
  }

  export interface Graph {
    addFile(filepath: string, parent: string): void;
    visitAncestors(filepath: string, callback: Function): void;
    visitDescendents(filepath: string, callback: Function): void;
    visit(filepath: string, callback: Function, edgeCallback: Function, visited: string[]): void;
    index: {
      [fileName: string]: Node
    };
  }

  export function parseFile(filepath: string, options?: Object): Graph;
  export function parseDir(dirpath: string, options?: Object): Graph;
}
