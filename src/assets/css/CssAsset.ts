import * as postcss from "postcss";
import { Asset } from "../Asset";

const URL_RE = /url\s*\(\"?(?![a-z]+:)/;
const IMPORT_RE = /@import/;
const DEP_RE = /(url\(['"]?(.*)['"]?\)|['"](.*)['"])/g;

export default class CssAsset extends Asset<postcss.Root> {
  type = "css";
  mightHaveDependencies() {
    return IMPORT_RE.test(this.contents) || URL_RE.test(this.contents);
  }

  parse() {
    this.ast = postcss.parse(this.contents, { from: this.name });
    return this.ast;
  }

  collectDependencies() {
    const deps: string[] = [];
    this.ast.walkAtRules("import", rule => {
      const { params } = rule;

      // Stupid JS Regex :(
      // More info here: https://stackoverflow.com/questions/1520800
      DEP_RE.lastIndex = 0;
      const match = DEP_RE.exec(params);

      if (match === null) {
        return;
      }

      if (match[3] !== undefined) {
        deps.push(match[3]);
      } else if (match[2] !== undefined) {
        deps.push(match[2]);
      }
    });

    return deps;
  }
}
