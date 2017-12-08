import emitter, { Logger } from "../logger";
import { filesFromMatch } from "../utils";
import { find } from "nicer-fs";
import { IKikiConfig } from "../config";

export interface Environment {
  options: IKikiConfig;
  logger: Logger;
  command: string;
}

const globOptions = { follow: true, ignore: "**/_*" };
export default async function task(
  env: Environment,
  globPath: string,
  basePath: string,
  taskName: string,
) {
  emitter.start(taskName, globPath);

  const matches = await find(globPath, globOptions);

  if (matches.length === 0) {
    emitter.nothingToDo();
    return [];
  }

  return filesFromMatch(matches, basePath);
}

export async function measure<T>(fn: () => T | Promise<T>) {
  const start = new Date().getTime();
  const result = await fn();

  return {
    duration: new Date().getTime() - start,
    result,
  };
}
