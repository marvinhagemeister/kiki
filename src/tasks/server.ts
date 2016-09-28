import { IKikiConfig  } from "../config/getConfig";
import { getConfig } from "../plugins/browser-sync/config";
import { getMiddleware } from "../plugins/webpack/middleware";
import { init as startServer } from "browser-sync";

export function start(config: IKikiConfig) {
  let middleware: any[] = getMiddleware(config);

  const files = config.sass.dest
    ? [config.sass.dest + "/*.css"]
    : [];

  const options = getConfig(config, middleware, files);
  startServer(options);
}
