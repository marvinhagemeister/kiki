import { IKikiConfig } from "../config/getConfig";
import * as emitter from "../emitter";

export function validate(config: IKikiConfig) {
  if (Object.keys(config).length === 0 && config.constructor === Object) {
    emitter.error("Received empty config file");
    return false;
  }

  if (config.sass) {
    if (!config.sass.src || !config.sass.dest) {
      emitter.error("Incomplete sass section found");
      return false;
    }
  }

  if (config.js) {
    if (!config.js.entry || !config.js.dest) {
      emitter.error("Incomplete js section found");
      return false;
    }
  }

  return true;
}
