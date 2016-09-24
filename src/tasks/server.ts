import webpackConfig from "../config/webpack.config";
import { init as startServer } from "browser-sync";
import * as path from "path";
import * as webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

interface IKikiServer {
  proxy?: string;
  publicPath?: string;
  cssPath?: string;
  js?: {
    entries: string[] | string,
    dest: string;
  };
}

function getWebpackConfig(conf: IKikiServer) {
  webpackConfig.entry.push(...conf.js.entries);
  webpackConfig.output = {
    filename: "[name].js",
    path: path.dirname(conf.js.dest),
    pathinfo: true,
    publicPath: conf.publicPath,
  };

  return webpackConfig;
}

export function start(config: IKikiServer) {
  let middleware: any[] = [];

  if (config.js) {
    const bundler = webpack(getWebpackConfig(config));
    middleware.push(webpackDevMiddleware(bundler, {
      publicPath: config.publicPath,
      stats: {
        colors: true,
      },
    }));
    middleware.push(webpackHotMiddleware(bundler));
  }

  const files = config.cssPath ? [config.cssPath] : [];
  startServer({
    open: false,
    files,
    middleware,
    server: "public",
    ui: false,
  });
}
