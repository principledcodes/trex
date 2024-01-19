import {
  Dependency,
  DependencyName,
  DependencyReferenceInfo,
} from "../deps/mod.ts";
import { type Diff } from "./Diff.ts";

export * from "./Diff.ts";

const depsRefToDiff = (newVersion: string) =>
(
  { version: oldVersion, ...refInfo }: DependencyReferenceInfo,
): Diff => ({
  ...refInfo,
  oldVersion,
  newVersion,
});

interface DiffProps {
  localDeps: Map<DependencyName, DependencyReferenceInfo[]>;
  registryDeps: Map<DependencyName, Dependency>;
}

export function diff(
  { localDeps, registryDeps }: DiffProps,
): Map<string, Diff[]> {
  const diffs: Diff[] = [];

  for (const [name, refInfo] of localDeps) {
    if (!registryDeps.has(name)) continue;

    const { version: registryVersion } = registryDeps.get(name)!;

    const d = refInfo
      .filter((ref) => ref.version !== registryVersion)
      .map(depsRefToDiff(registryVersion));

    diffs.push(...d);
  }

  return Map.groupBy(diffs, (diff) => diff.referenceLocation);
}
