import getConfig from "../config/getConfig";
import { build } from "../tasks/build";
import { watch } from "../tasks/watch";

const configPath = process.argv[2];
const forceProduction = process.argv[3];

if (forceProduction) {
  process.env.NODE_ENV = "production";
}

const config = getConfig(configPath);
build(config)
  .then(() => {
    return watch(config);
  });
