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

test("vara_github_repo returns repository metadata from GitHub", () => {
  const httpClient = {
    get(url) {
      if (url.endsWith("/releases/latest")) {
        return { ok: true, body: JSON.stringify({ tag_name: "v1.2.3" }) };
      }

      return {
        ok: true,
        body: JSON.stringify({ stargazers_count: 1_234, forks_count: 56 }),
      };
    },
  };

  assert.deepEqual(githubRepo({ httpClient }, "example/primary-metadata"), {
    ok: true,
    stars: 1_234,
    forks: 56,
    tag: "v1.2.3",
  });
});

test("vara_github_repo falls back to public badge metadata", () => {
  const httpClient = {
    get(url) {
      if (url.startsWith("https://api.github.com/")) {
        return { ok: false, body: "" };
      }

      return { ok: true, body: JSON.stringify({ value: "12.3k" }) };
    },
  };

  assert.deepEqual(githubRepo({ httpClient }, "example/badge-metadata"), {
    ok: true,
    stars: 12_300,
    forks: 0,
    tag: "",
  });
});
