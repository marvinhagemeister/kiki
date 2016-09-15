import * as config from "./config/getConfig";
export { build } from "./tasks/build";
export { watch } from "./tasks/watch";

export const getConfig = config;
