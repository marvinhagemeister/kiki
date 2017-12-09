import * as path from "path";
import CssAsset from "../css/CssAsset";

export default class SassAsset extends CssAsset {
  type = "scss";
  constructor(public name: string) {
    super(name);
    if (path.basename(name).startsWith("_")) {
      this.includedInParent = true;
    }
  }
}
