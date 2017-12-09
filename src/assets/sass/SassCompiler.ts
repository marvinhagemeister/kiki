import { promisify } from "util";
import * as nSass from "node-sass";
import Compiler from "../compilers/Compiler";
import SassAsset from "./SassAsset";

export type SassRender = (options: nSass.Options) => Promise<nSass.Result>;
const render: SassRender = promisify(nSass.render.bind(nSass));

export default class SassCompiler extends Compiler {
  AssetConstructor = SassAsset;

  async compile(asset: SassAsset) {
    // TODO: Sourcemaps
    const result = await render({
      data: asset.contents,
    });

    asset.contents = result.css.toString();
    // TODO: Detach children
    // TODO: Convert to css
  }
}
