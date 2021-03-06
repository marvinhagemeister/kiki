import * as emitter from "../emitter";
import { resolveApp } from "../utils";
import { validate } from "./validate";

export interface IKikiConfig {
  production?: boolean;
  sass?: {
    src: string;
    dest: string;
    addVendorPrefixes?: boolean;
    cssnext?: boolean;
  };
  js?: {
    entry: string;
    dest: string;
  };
}

export default function getConfig(configPath?: string) {
  const path =
    configPath !== undefined
      ? resolveApp(configPath)
      : resolveApp("kiki.config.json");

  try {
    const config = require(path);

    if (!validate(config)) {
      process.exit(1);
    }

    return config;
  } catch (err) {
    if (err.toString().indexOf("in JSON") > -1) {
      emitter.invalidJson(err.message, path);
    }

    emitter.error(err);

    process.exit(1);
  }
}
