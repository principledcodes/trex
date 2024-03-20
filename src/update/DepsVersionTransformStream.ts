import { Diff } from "src/diff/mod.ts";

export default class DepsVersionTransformStream
  extends TransformStream<string, string> {
  #currentLine = 0;
  #diffs: Diff[] = [];
  #diffIdx = 0;

  constructor(diffs: Diff[]) {
    super({
      transform: (chunk, controller) => {
        ++this.#currentLine;

        if (this.#diffIdx < 0) {
          controller.enqueue(chunk);
          return;
        }

        let c = chunk;
        const diff = this.#diffs[this.#diffIdx];

        if (this.#currentLine === diff.referenceLine) {
          c = chunk.replace(`@${diff.oldVersion}`, `@${diff.newVersion}`);

          if (++this.#diffIdx >= this.#diffs.length) {
            this.#diffIdx = -1;
          }
        }

        controller.enqueue(c);
      },
    });

    this.#diffs = diffs;
  }
}
