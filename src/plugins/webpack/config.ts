import { IKikiConfig } from "../../config/getConfig";
import webpackConfig from "./webpack.config";
import * as path from "path";

export function getWebpackConfig(conf: IKikiConfig ) {
  const entry = conf.js.entry;
  const entries = Array.isArray(entry) ? entry : [entry];

  webpackConfig.entry.push(...entries);
  webpackConfig.output.path = path.dirname(conf.js.dest);

  return webpackConfig;
}
