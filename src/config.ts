import emitter from "./logger";
import * as path from "path";

export interface Entry {
  src: string;
  dest: string;
  keepFolderStructure?: boolean;
}

export interface IKikiConfig {
  mains: Entry[];
}

export default function getConfig(configPath?: string) {
  const fPath =
    configPath !== undefined
      ? path.resolve(configPath)
      : path.resolve("kiki.config.json");

  try {
    const config = require(fPath);

    return config;
  } catch (err) {
    if (err.toString().indexOf("in JSON") > -1) {
      emitter.invalidJson(err.message, fPath);
    }

    emitter.error(err);

    process.exit(1);
  }
}
