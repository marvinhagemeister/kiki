import getConfig from "../config/getConfig";
import { start } from "../tasks/server";

const config = getConfig();
start(config);
