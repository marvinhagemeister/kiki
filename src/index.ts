import getConfig from "./config/getConfig";
import { build } from "./tasks/build";

build(getConfig());
