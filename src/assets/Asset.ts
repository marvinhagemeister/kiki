import { readFile } from "nicer-fs";

export type SerializedAsset = Record<string, string>;

export interface BaseAsset<T> {
  type: string;
  id: number;
  parents: string[];
  ast?: T;
  contents?: string;
  getDependencies(): Promise<Asset[]>;
  mightHaveDependencies(): boolean;
  collectDependencies(): Asset[];
  loadIfNeeded(): Promise<string>;
  load(): Promise<string>;
  parseIfNeeded(): Promise<T>;
  parse(): Promise<T>;
  generate(): SerializedAsset;
  invalidate(): this;
}

let ASSET_ID = 0;

export class Asset<T = any> implements BaseAsset<T> {
  type = "unknown";
  parents = [];
  id = ASSET_ID++;
  ast?: T;
  contents?: string;

  constructor(public name: string) {}

  async getDependencies(): Promise<Asset[]> {
    await this.loadIfNeeded();

    if (this.mightHaveDependencies()) {
      await this.parseIfNeeded();
      return this.collectDependencies();
    }

    return [];
  }

  mightHaveDependencies(): boolean {
    return true;
  }

  collectDependencies(): Asset[] {
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

  async parseIfNeeded() {
    if (this.ast === undefined) {
      this.ast = await this.parse();
    }

    return this.ast;
  }

  async parse(): Promise<T> {
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
