// import { IKikiConfig } from "../config/getConfig";
// import * as emitter from "../emitter";
// import { IFile } from "../io/file";
// import { writeFiles } from "../io/writeFiles";
// import { IKikiSassConfig } from "../plugins/node-sass/index";
// import { build as sass } from "./sass";
// import task from "./task";
// import * as Promise from "bluebird";
// import * as path from "path";

// process.env.NODE_ENV = "production";

// // Sass
// export function buildSass(config: IKikiSassConfig) {
//   const globPath = path.resolve(config.src) + "/**/*.scss";

//   return task(globPath, "sass")
//     .then(sass(config))
//     .then(writeFiles(config.dest))
//     .catch((err: Error) => {
//       emitter.error(err);
//     });
// }

// export function build(config: IKikiConfig) {
//   const start = new Date().getTime();

//   return Promise.all(buildSass(config.sass))
//     .then((items: IFile[]) => {
//       if (items.length > 0) {
//         const time = new Date().getTime() - start;
//         emitter.taskDone(items, time);
//       }
//     }).catch(err => {
//       emitter.error(err);
//     });
// }
