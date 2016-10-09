import { Buffer } from "buffer";

export interface IFile {
  location: string;
  content?: string;
  map: boolean | string;
}

export interface IFile2 {
  location: string;
  content?: Buffer;
  map: boolean | Buffer;
}
