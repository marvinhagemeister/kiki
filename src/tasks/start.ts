import webpackConfig from "../config/webpack.config";
import { init } from "browser-sync";
import * as path from "path";
import * as webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

interface IKikiServer {
  entry?: string;
  dest?: string;
  files?: string[];
  bundler?: "webpack";
  publicPath: "string";
}

function getWebpackConfig(config: IKikiServer) {
  webpackConfig.entry.push(config.entry);
  webpackConfig.output = {
    filename: path.basename(config.entry),
    path: path.dirname(config.dest),
    pathinfo: true,
    publicPath: config.publicPath,
  };

  return webpackConfig;
}

export function start(config: IKikiServer) {
  const files = config.files ? config.files : [];
  const bundler = webpack(getWebpackConfig(config));

  let middleware: any[] = [];
  if (config.bundler) {
    middleware.push(
      webpackDevMiddleware(bundler, {
        publicPath: config.publicPath,
        stats: {
          colors: true,
        },
      }
      ));
    middleware.push(webpackHotMiddleware(bundler));
  }

  init({
    open: false,
    files,
    middleware,
    server: "public",
    ui: false,
  });
}
