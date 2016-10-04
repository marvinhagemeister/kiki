import * as path from "path";

export const fixturePath = path.resolve(__dirname, "fixtures");

export function getFixture(fixture: string) {
  return path.resolve(fixturePath, fixture);
}
