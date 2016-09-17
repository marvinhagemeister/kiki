declare module 'case-sensitive-paths-webpack-plugin' {

  export default class CaseSensitivePathsPlugin {
    constructor(options?: Object);

    private reset();
    private getFileNamesInDir(dir: string);
    private fileExistsWithCaseSync(filepath: string);
  }
}
