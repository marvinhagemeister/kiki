export interface IFile {
  location: string;
  dest: string;
  content?: string;
  map: boolean | string;
}
