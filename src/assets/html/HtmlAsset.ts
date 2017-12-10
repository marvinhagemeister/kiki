import { Asset } from "../Asset";
import * as api from "posthtml/lib/api";
import * as parse from "posthtml-parser";

const LINK_RE = /<link[^>]*href=.*[^\/>]*\/>/g;
const SCRIPT_RE = /<script[^>]*src=.*[^\/>]*><\/script>/g;

const TAGS = new Set(["link", "script"]);

export default class HtmlAsset extends Asset {
  mightHaveDependencies() {
    return LINK_RE.test(this.contents) || SCRIPT_RE.test(this.contents);
  }

  parse() {
    const res = parse(this.contents);
    res.walk = api.walk;
    return res;
  }

  collectDependencies() {
    const deps: string[] = [];

    this.ast.walk(node => {
      if (TAGS.has(node.tag) && node.attrs !== undefined) {
        let dep: string = node.attrs.src;
        if (dep === undefined) {
          dep = node.attrs.href;
        }

        deps.push(dep);
      }

      return node;
    });

    return deps;
  }
}
