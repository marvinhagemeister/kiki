import * as emitter from "../emitter";
import { resolveApp } from "../utils";
import { validate } from "./validate";

export interface IKikiConfig {
  sass?: {
    src: string;
    dest: string;
  };
  js?: {
    entry: string | string[];
    dest: string;
  };
  server?: {
    proxy?: string;
    serveStatic?: string;
  };
}

export default function getConfig() {
  const path = resolveApp("kiki.config.json");

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
