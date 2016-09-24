export { compile } from "./compile";
export { filterSass } from "./filterSass";

export interface IKikiSassConfig {
  src: string;
  dest: string;
  addVendorPrefixes?: boolean;
  cssnext?: boolean;
}
