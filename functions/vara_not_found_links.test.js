import assert from "node:assert/strict";
import test from "node:test";

import notFoundLinks from "./vara_not_found_links.js";

const resolveNotFoundLinks = notFoundLinks.resolve;

test("normalizes ordered not-found links and marks only the first as primary", () => {
  assert.deepEqual(
    resolveNotFoundLinks([
      {
        title: " Go home ",
        href: " / ",
      },
      {
        title: " Read the docs ",
        href: " /docs/ ",
        icon: " book-open ",
        new_tab: true,
      },
    ]),
    [
      {
        title: "Go home",
        href: "/",
        icon: "",
        new_tab: false,
        primary: true,
      },
      {
        title: "Read the docs",
        href: "/docs/",
        icon: "book-open",
        new_tab: true,
        primary: false,
      },
    ],
  );
});

test("ignores invalid not-found links before assigning the primary link", () => {
  const links = [
    null,
    [],
    { title: "Missing href" },
    { href: "/missing-title/" },
    { title: "Valid", href: "/valid/", new_tab: "true" },
  ];

  assert.deepEqual(notFoundLinks({}, links), [
    {
      title: "Valid",
      href: "/valid/",
      icon: "",
      new_tab: false,
      primary: true,
    },
  ]);
  assert.deepEqual(resolveNotFoundLinks(null), []);
});
