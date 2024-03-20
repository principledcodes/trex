import { Command, Runnable } from "./types.ts";
import main from "./main.ts";
import help from "./help.ts";
import version from "./version.ts";

export const commands: Record<Command, Runnable> = {
  main,
  help,
  version,
};

export { type Command, type Options, type Runnable } from "./types.ts";
export { parseArgs } from "./args_parser.ts";
