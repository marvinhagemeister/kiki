import getConfig from "../config/getConfig";
import { build } from "../tasks/build";
import { watch } from "../tasks/watch";

const configPath = process.argv[2];
const forceProduction = process.argv[3] === "true"; // arg is returned as string

const config = getConfig(configPath);
build(config)
  .then(() => {
    return watch(config, forceProduction);
  });
