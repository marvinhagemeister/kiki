import * as path from "path";
import { find } from "nicer-fs";
import { Asset } from "../Asset";

export interface CustomFs {
  find(globber: string, options?: glob.IOptions): Promise<string[]>;
}

export default class GlobAsset extends Asset<string[]> {
  type = null;
  ast: string[] = [];

  constructor(public name: string, private fs: CustomFs = { find }) {
    super(name);
  }

  async load() {
    const files = await this.fs.find(this.name, { strict: true, nodir: true });

    for (const file of files) {
      this.ast.push("./" + path.relative(path.dirname(this.name), file));
    }
  }

  collectDependencies() {
    return this.ast;
  }
}
