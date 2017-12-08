import { Asset } from "./Asset";

const URL_RE = /url\s*\(\"?(?![a-z]+:)/;
const IMPORT_RE = /@import/;

const IMPORT_PARSE_RE = /\@import ([.\s\S]+?);?$/g;
const DEP_REG = /["'](.+?)["']/g;

export default class CssAsset extends Asset<any> {
  mightHaveDependencies() {
    return IMPORT_RE.test(this.contents) || URL_RE.test(this.contents);
  }

  // TODO: Handle image and font assets
  collectDependencies() {
    let importMatch;
    let depMatch;
    const results: string[] = [];
    while ((importMatch = IMPORT_PARSE_RE.exec(this.contents)) !== null) {
      while ((depMatch = DEP_REG.exec(importMatch[1])) !== null) {
        results.push(depMatch[1]);
      }
    }
    return [];
  }
}
