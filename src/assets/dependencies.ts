import { Asset } from "./Asset";

export type DAG = Map<number, any>;

export async function addNode(dag: DAG, node: Asset) {
  dag.set(node.id, node);

  const deps = await node.getDependencies();
  for (const dep of deps) {
    if (!dag.has(dep.id)) {
      addNode(dag, dep);
    } else {
      addLink(dag, node, dep);
    }
  }
}

export function addLink(dag: DAG, node: Asset, dep: Asset) {
  const cached = dag.get(dep.id);
  cached.parents.push(node.id);
  dag.set(dep.id, cached);
}

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

export async function update(dag: DAG, compiler: any) {
  const nodes = sortTopological(dag);
  for await (const node of nodes) {
    await compiler(dag, node);
  }
}
