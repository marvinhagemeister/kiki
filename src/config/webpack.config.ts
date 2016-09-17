
import { resolveApp } from "../utils";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

const isProd = process.env.NODE_ENV === "production";

function getEsLintConfig() {
  let eslintConfig = "";
  try {
    eslintConfig = isProd ? resolveApp(".eslintrc") : path.resolve("./eslintrc.dev");
  } catch (e) {
    eslintConfig = isProd ? path.resolve("./eslintrc") : path.resolve("./eslintrc.dev");
  }

  return eslintConfig;
}

const getPlugins = () => {
  if (isProd) {
    return [
      new webpack.DefinePlugin({
        "process.env": { NODE_ENV: JSON.stringify("production") },
      }),
      new CaseSensitivePathsPlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ];
  }

  return [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") },
    }),
    new webpack.optimize.OccurenceOrderPlugin(false),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ];
};

function getEntry() {
  let entry: string[] = [];

  if (isProd) {
    entry.push(require.resolve("webpack-dev-server/client") + "?/");
    entry.push(require.resolve("webpack-hot-middleware/client"));
  }

  return entry;
}

interface IWebpackConfig {
  debug?: boolean;
  devtool?: "source-map" | "eval";
  entry: string[];
  output: {
    filename?: string;
    path?: string;
    pathinfo?: boolean;
    publicPath?: string;
  };
  eslint: any;
  module: {
    loaders: any[],
    preLoaders?: any[]
  };
  plugins: any[];
  progress: boolean;
}

const webpackConfig: IWebpackConfig = {
  debug: !isProd,
  devtool: isProd ? "source-map" : "eval",
  entry: getEntry(),
  eslint: {
    configFile: getEsLintConfig(),
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: "babel-loader",
      test: /\.js$/,
    }],
    preLoaders: [{
      exclude: /node_modules/,
      loader: "eslint-loader",
      test: /\.js$/,
    }],
  },
  output: {},
  plugins: getPlugins(),
  progress: true,
};

export default webpackConfig;
