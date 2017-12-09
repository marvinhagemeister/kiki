import { readFile } from "nicer-fs";

export type SerializedAsset = Record<string, string>;

export interface BaseAsset<T> {
  type: string;
  id: number;
  parents: Asset[];
  ast?: T;
  contents?: string;
  includedInParent: boolean;
  dynamic: boolean;
  getDependencies(): Promise<string[]>;
  mightHaveDependencies(): boolean;
  collectDependencies(): string[];
  loadIfNeeded(): Promise<string>;
  load(): Promise<string>;
  parseIfNeeded(): T;
  parse(): T;
  generate(): SerializedAsset;
  invalidate(): this;
}

let ASSET_ID = 0;

export class Asset<T = any> implements BaseAsset<T> {
  type = "unknown";
  parents: Asset[] = [];
  id = ASSET_ID++;
  includedInParent = false;
  dynamic = false;
  ast?: T;
  contents?: string;

  constructor(public name: string) {}

  async getDependencies(): Promise<string[]> {
    await this.loadIfNeeded();

    if (this.mightHaveDependencies()) {
      this.parseIfNeeded();
      return this.collectDependencies();
    }

    return [];
  }

  mightHaveDependencies(): boolean {
    return true;
  }

  collectDependencies(): string[] {
    return [];
  }

  async loadIfNeeded() {
    if (this.contents === undefined) {
      this.contents = await this.load();
    }

    return this.contents;
  }

  async load() {
    return readFile(this.name);
  }

  parseIfNeeded() {
    if (this.ast === undefined) {
      this.ast = this.parse();
    }

    return this.ast;
  }

  parse(): T {
    return undefined;
  }

  generate() {
    return {
      [this.type]: this.contents,
    };
  }

  invalidate() {
    return this;
  }

  async process() {
    await this.loadIfNeeded();
    await this.getDependencies();
  }
}
