import { Asset } from "./Asset";
import Resolver from "./Resolver";

export type DAG = Map<number, Asset>;

export default class Graph {
  private dag: DAG = new Map();
  private file2Id = new Map<string, number>();

  has(fileOrId: number | string) {
    return typeof fileOrId === "string"
      ? this.file2Id.has(fileOrId)
      : this.dag.has(fileOrId);
  }

  get(fileOrId: number | string) {
    if (typeof fileOrId === "string") {
      fileOrId = this.file2Id.get(fileOrId);
    }
    return this.dag.get(fileOrId);
  }

  invalidate(fileOrId: number | string) {
    if (typeof fileOrId === "string") {
      fileOrId = this.file2Id.get(fileOrId);
    }

    return this.dag.get(fileOrId).invalidate();
  }

  async addNode(node: Asset, resolver: Resolver) {
    const dag = this.dag;
    dag.set(node.id, node);
    this.file2Id.set(node.name, node.id);

    const deps = await node.getDependencies();
    for await (const dep of deps) {
      if (!this.has(dep)) {
        const Ctor = resolver.getAssetCtor(dep);
        await this.addNode(new Ctor(dep), resolver);
      } else {
        this.addLink(node, this.get(dep));
      }
    }
  }

  addLink(node: Asset, dep: Asset) {
    const dag = this.dag;
    dep.parents.push(node);
  }
}

export function sortTopological(dag: DAG): Asset[] {
  const out: Asset[] = [];
  const visited = new Set<number>();

  dag.forEach(node => {
    if (!visited.has(node.id)) {
      visited.add(node.id);
      out.unshift(node);
    }

    // TODO: Add support for multiple parents
    const parent = dag.get(node.parents[0].id);
    if (parent !== undefined && !visited.has(parent.id)) {
      visited.add(parent.id);
      out.push(parent);
    }
  });

  return out;
}
