import assert from "node:assert/strict";
import test from "node:test";

import docsFooterLinks from "./vara_docs_footer_links.js";

const resolveDocsFooterLinks = docsFooterLinks.resolve;

test("normalizes ordered docs footer links with new tabs by default", () => {
  assert.deepEqual(
    resolveDocsFooterLinks([
      {
        title: " Edit this page ",
        href: " https://github.com/acme/docs/edit/main/guide.md ",
        icon: " pencil-line ",
      },
      {
        title: "Rate this page",
        href: "/feedback/",
        new_tab: false,
      },
    ]),
    [
      {
        title: "Edit this page",
        href: "https://github.com/acme/docs/edit/main/guide.md",
        icon: "pencil-line",
        new_tab: true,
      },
      {
        title: "Rate this page",
        href: "/feedback/",
        icon: "",
        new_tab: false,
      },
    ],
  );
});

test("ignores invalid docs footer links and reads values from function arguments", () => {
  const links = [
    null,
    [],
    { title: "Missing href" },
    { href: "/missing-title/" },
    { title: "Valid", href: "/valid/", new_tab: 0 },
  ];

  assert.deepEqual(docsFooterLinks({}, links), [
    { title: "Valid", href: "/valid/", icon: "", new_tab: true },
  ]);
  assert.deepEqual(resolveDocsFooterLinks(null), []);
});
