import { Asset } from "./Asset";

export default class Graph {
  dag = new Map<number, Asset>();
  private file2Id = new Map<string, number>();

  has(fileOrId: number | string) {
    return typeof fileOrId === "string"
      ? this.file2Id.has(fileOrId)
      : this.dag.has(fileOrId);
  }

  invalidate(fileOrId: number | string) {
    if (typeof fileOrId === "string") {
      fileOrId = this.file2Id.get(fileOrId);
    }

    return this.dag.get(fileOrId).invalidate();
  }

  async addNode(node: Asset) {
    const dag = this.dag;
    dag.set(node.id, node);
    this.file2Id.set(node.name, node.id);

    const deps = await node.getDependencies();
    for (const dep of deps) {
      if (!dag.has(dep.id)) {
        // FIXME: async
        this.addNode(dep);
      } else {
        this.addLink(dag, node, dep);
      }
    }
  }

  addLink(dag: DAG, node: Asset, dep: Asset) {
    const cached = dag.get(dep.id);
    cached.parents.push(node.id);
    dag.set(dep.id, cached);
  }
}

export type DAG = Map<number, any>;
export function sortTopological(dag: DAG): Asset[] {
  const out: Asset[] = [];
  const visited = new Set<string>();

  dag.forEach(node => {
    if (!visited.has(node.id)) {
      visited.add(node.id);
      out.unshift(node);
    }

    // TODO: Add support for multiple parents
    const parent = dag.get(node.parents[0]);
    if (parent !== undefined && !visited.has(parent.id)) {
      visited.add(parent.id);
      out.push(parent);
    }
  });

  return out;
}
