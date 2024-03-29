import { assert } from "deps";
import { load, loadAll } from "./mod.ts";

Deno.test({
  name: "load",
  ignore: Deno.env.get("REGISTRY_URL") == null,
  async fn() {
    const dep = await load("std");
    assert.assertNotInstanceOf(dep, Error);
    assert.assertEquals(dep.name, "std");
    assert.assertMatch(dep.version, /\d+\.\d+\.\d+/);
  },
});

Deno.test({
  name: "loadAll",
  ignore: Deno.env.get("REGISTRY_URL") == null,
  async fn() {
    const deps = await loadAll(["std", "oak"]);

    const std = deps.get("std")!;
    assert.assertNotInstanceOf(std, Error);
    assert.assertEquals(std.name, "std");
    assert.assertMatch(std.version, /\d+\.\d+\.\d+/);

    const oak = deps.get("oak")!;
    assert.assertNotInstanceOf(oak, Error);
    assert.assertEquals(oak.name, "oak");
    assert.assertMatch(oak.version, /v\d+\.\d+\.\d+/);
  },
});

Deno.test({
  name: "loadAll with error",
  ignore: Deno.env.get("REGISTRY_URL") == null,
  async fn() {
    const deps = await loadAll(["std", "oaksss"]);

    const std = deps.get("std")!;
    assert.assertNotInstanceOf(std, Error);
    assert.assertEquals(std.name, "std");
    assert.assertMatch(std.version, /\d+\.\d+\.\d+/);

    const oaksss = deps.get("oaksss")!;
    assert.assertInstanceOf(oaksss, Error);
    assert.assertMatch(
      oaksss.message,
      /failed to load dependency info for oakss/,
    );
  },
});
