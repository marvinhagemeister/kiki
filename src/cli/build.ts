import getConfig from "../config/getConfig";
import { build } from "../tasks/build";

const configPath = process.argv[2];

const config = getConfig(configPath);
build(config);
