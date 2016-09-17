import * as config from "./config/getConfig";
export { build } from "./tasks/build";
export { watch } from "./tasks/watch";
export { start } from "./tasks/start";

export const getConfig = config;
