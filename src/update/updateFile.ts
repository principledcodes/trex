import type { Diff } from "src/diff/mod.ts";
import { DelimiterStream } from "@std/streams";
import DepsVersionTransformStream from "src/update/DepsVersionTransformStream.ts";

export interface UpdateFileProps {
  file: string;
  diffs: Diff[];
}

export async function updateFile({ file, diffs }: UpdateFileProps) {
  console.log("\n🦕 Updating dependencies file:", file);

  using fr = await Deno.open(file, { read: true });
  using fw = await Deno.open(file, { write: true });

  await fr.readable
    .pipeThrough(
      new DelimiterStream(new TextEncoder().encode("\n"), {
        disposition: "suffix",
      }),
    )
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new DepsVersionTransformStream(diffs))
    .pipeThrough(new TextEncoderStream())
    .pipeTo(fw.writable);
}
