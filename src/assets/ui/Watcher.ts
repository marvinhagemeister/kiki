import * as chokidar from "chokidar";
import Resolver from "../Resolver";
import { FSWatcher } from "chokidar";
import Graph from "../Graph";
import { Asset } from "../Asset";
import { Logger } from "./Logger";

export default class Watcher {
  private instance: FSWatcher;

  constructor(
    private watcher: typeof chokidar = chokidar,
    private resolver: Resolver,
    private graph: Graph,
    private logger: Logger,
  ) {}

  start(paths: string[]) {
    this.logger.startWatch(paths);
    this.instance = this.watcher.watch(paths);
    this.instance.on("all", this.onChange.bind(this));
  }

  private async onChange(event: string, name: string) {
    this.logger.change(event, name);

    let asset: Asset;
    if (this.graph.has(name)) {
      asset = this.graph.invalidate(name);
    } else {
      const Ctor = this.resolver.getAssetCtor(name);
      asset = new Ctor(name);
      this.graph.addNode(asset);
    }

    // Trigger recompile
    const compiler = this.resolver.getCompiler(asset);
    await compiler.compile([asset]);
  }
}
