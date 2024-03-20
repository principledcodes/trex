import { cli } from "deps";
import { Options } from "./types.ts";

export function parseArgs(args: string[]): Options {
  return cli.parseArgs(args, {
    boolean: ["help", "version", "update"],
    string: ["file"],
    alias: {
      file: ["f"],
      help: ["h"],
      update: ["u"],
      version: ["v"],
    },
    default: {
      file: "deps.ts",
      update: false,
    },
    unknown: (arg) => {
      console.error("❗Unknown option:", arg);
      Deno.exit(1);
    },
  });
}
