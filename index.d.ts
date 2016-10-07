declare module "kiki-bundler" {
  export interface IKikiConfig {
    sass?: {
      src: string;
      dest: string;
    };
  }

  export interface IFile {
    location: string;
    content?: string;
    map: boolean | string;
  }

  export function build(config: IKikiConfig): PromiseLike<IFile[]>;
  export function watch(config: IKikiConfig): void;
  export function getConfig(): IKikiConfig;
}
