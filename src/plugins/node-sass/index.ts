import { IFile } from "../../io/file";
export { filterSass } from "./filterSass";

export interface IKikiSassConfig {
  src: string;
  dest: string;
  addVendorPrefixes?: boolean;
  cssnext?: boolean;
}

interface WhateverOpts {
  dest?: string;
}

export function compile(options: WhateverOpts) {
  return (files: IFile[]) => {
    return Promise.resolve(files);
  };
}
