export { filterSass } from "./filterSass";
export { SassTransform } from "./transform";

export interface IKikiSassConfig {
  src: string;
  dest: string;
  addVendorPrefixes?: boolean;
  cssnext?: boolean;
}
