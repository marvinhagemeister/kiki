import Compiler from "../compilers/Compiler";
import CssAsset from "./CssAsset";

export default class CssCompiler extends Compiler {
  AssetConstructor = CssAsset;

  async compile(asset: CssAsset) {}
}
