import { IKikiConfig } from "../../config/getConfig";
import { Options } from "browser-sync";

export function getConfig(config: IKikiConfig, middleware: any[] = [], files: string[] = []): Options {
  let options: Options = {
    open: false,
    files,
    middleware,
    ui: false,
  };

  const { proxy, serveStatic } = config.server;
  if (proxy) {
    options.proxy = proxy;
  } else if (serveStatic) {
    options.server = serveStatic;
  }

  return options;
}
