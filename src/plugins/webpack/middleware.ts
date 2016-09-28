import { IKikiConfig } from "../../config/getConfig";
import { getWebpackConfig } from "./config";
import * as webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

export function getMiddleware(config: IKikiConfig): any[] {
  if (config.js) {
    const bundler = webpack(getWebpackConfig(config));
    return [
      webpackDevMiddleware(bundler, {
        stats: {
          colors: true,
        },
      }),
      webpackHotMiddleware(bundler),
    ];
  }

  return [];
}
