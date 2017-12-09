import Resolver from "./Resolver";
import Graph from "./Graph";

export default class Main {
  constructor(private resolver: Resolver, private graph: Graph) {}

  addOrInvalidate(file: string) {
    if (this.graph.has(file)) {
      return this.graph.invalidate(file);
    } else {
      const Ctor = this.resolver.getAssetCtor(file);
      const asset = Ctor.constructor(file);
      this.graph.addNode(asset);
      return asset;
    }
  }
}
