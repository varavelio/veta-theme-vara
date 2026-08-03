import assert from "node:assert/strict";
import test from "node:test";

import docsRoutes from "./vara_docs_routes.js";

const resolveDocsRoutes = docsRoutes.resolve;

test("resolves independent normalized documentation routes", () => {
  assert.deepEqual(
    resolveDocsRoutes(
      {
        docs_root_permalink: "products//acme/manual?preview=true",
        docs_search_index_permalink: "search//manual.json#build",
      },
      {},
    ),
    {
      root: "/products/acme/manual/",
      search_index: "/search/manual.json",
    },
  );
});

test("uses project settings before defaults and rejects external routes", () => {
  assert.deepEqual(
    resolveDocsRoutes(
      { docs_root_permalink: "https://example.com/docs" },
      {
        docs_root_permalink: "/wiki/",
        docs_search_index_permalink: "/vara-search.json",
      },
    ),
    {
      root: "/wiki/",
      search_index: "/vara-search.json",
    },
  );
  assert.deepEqual(resolveDocsRoutes({}, {}), {
    root: "/docs/",
    search_index: "/docs/vara-docs-search-index.json",
  });
});

test("reads documentation routes from function context", () => {
  assert.deepEqual(
    docsRoutes({
      data: {
        site: { docs_root_permalink: "/manual" },
        site_default: { docs_search_index_permalink: "/index/search.json" },
      },
    }),
    {
      root: "/manual/",
      search_index: "/index/search.json",
    },
  );
});

test("supports a root documentation tree and rejects directory index routes", () => {
  assert.deepEqual(
    resolveDocsRoutes(
      { docs_root_permalink: "/", docs_search_index_permalink: "/search/" },
      { docs_search_index_permalink: "/vara-search.json" },
    ),
    {
      root: "/",
      search_index: "/vara-search.json",
    },
  );
});
