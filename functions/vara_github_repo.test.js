import assert from "node:assert/strict";
import test from "node:test";

import githubRepo from "./vara_github_repo.js";

test("vara_github_repo returns a safe empty result for invalid repo input", () => {
  assert.deepEqual(githubRepo({ httpClient: {} }, "not-a-repo"), {
    ok: false,
    stars: 0,
    forks: 0,
    tag: "",
  });
});
