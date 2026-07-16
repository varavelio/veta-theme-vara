import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import icon from "./icon.js";

test("icon injects classes while preserving optimized SVG attributes", () => {
  const output = icon(
    {
      files: {
        readFile(path) {
          return readFileSync(path, "utf8");
        },
      },
    },
    "check",
    "size-4 text-content",
  );

  assert.match(output, /^<svg class="vara-icon size-4 text-content" /);
  assert.match(output, /fill="none"/);
  assert.match(output, /stroke="currentColor"/);
});
