export interface Options {
  file: string;
  help: boolean;
  update: boolean;
  version: boolean;
}

export type Command = "main" | "help" | "version";

export type ExitCode = number;

export type AsyncRunFn = (opts: Options) => Promise<ExitCode>;
export type RunFn = (opts: Options) => ExitCode;

export interface Runnable {
  run: RunFn | AsyncRunFn;
}
