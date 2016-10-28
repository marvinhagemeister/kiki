declare module "cross-spawn" {
  import child_process = require("child_process");

  export function spawn(command: string, args?: string[], options?: child_process.SpawnOptions): child_process.ChildProcess;

  export function sync(command: string, args?: string[], options?: child_process.SpawnSyncOptionsWithStringEncoding): child_process.SpawnSyncReturns<string>;
  export function sync(command: string, args?: string[], options?: child_process.SpawnSyncOptionsWithBufferEncoding): child_process.SpawnSyncReturns<Buffer>;
  export function sync(command: string, args?: string[], options?: child_process.SpawnSyncOptions): child_process.SpawnSyncReturns<Buffer>;
}
