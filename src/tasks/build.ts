import emitter from "../logger";
import { build as sass } from "./sass";
import findFiles, { measure, Environment } from "./task";
import * as path from "path";

export async function build(env: Environment) {
  const base = path.resolve(env.options.sass!.src);
  const globPath = base + "/**/*.scss";

  // TODO: Set compressed output
  const files = await findFiles(env, globPath, base, "sass");

  const { result, duration } = await measure(() =>
    Promise.all(sass(env, files) as any),
  );

  if (result.length > 0) {
    emitter.taskDone(result as any[], duration);
  }

  return result;
}
