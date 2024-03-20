import { commands, Options, parseArgs, Runnable } from "./commands/mod.ts";

const run = async () => {
  const opts: Options = parseArgs(Deno.args);

  console.log("🦖 TRex - Deno Dependency Inspector\n");

  const command: Runnable = opts.help
    ? commands.help
    : opts.version
    ? commands.version
    : commands.main;

  const code = await command.run(opts);

  Deno.exit(code);
};

if (import.meta.main) {
  run();
}
