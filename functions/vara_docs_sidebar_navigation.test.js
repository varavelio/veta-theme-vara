import assert from "node:assert/strict";
import test from "node:test";

import docsSidebarNavigation from "./vara_docs_sidebar_navigation.js";

const resolveDocsSidebarNavigation = docsSidebarNavigation.resolve;

test("builds weighted sidebar sections from generated documentation pages", () => {
  const pages = [
    docsPage("/docs/guide/install/", "Install", 2, "download"),
    docsPage("/docs/", "Documentation", 0, "book"),
    docsPage("/docs/reference/", "Reference", 20, "braces"),
    docsPage("/docs/guide/", "Guide", 10, "rocket"),
    docsPage("/docs/guide/empty/", "Empty", 1, "", ""),
    { permalink: "/docs/guide/index.md", template: "vara-docs-raw", title: "Ignored" },
  ];

  assert.deepEqual(resolveDocsSidebarNavigation(pages, "/docs/", [], "/docs/guide/install/"), {
    root: {
      active: false,
      href: "/docs/",
      icon: "book",
      title: "Documentation",
    },
    sections: [
      {
        active: false,
        href: "/docs/guide/",
        icon: "rocket",
        id: "guide",
        links: [
          {
            active: true,
            external: false,
            href: "/docs/guide/install/",
            icon: "download",
            key: "/docs/guide/install",
            new_tab: false,
            title: "Install",
            weight: 2,
          },
        ],
        storage_id: "section:/docs/guide/",
        title: "Guide",
        weight: 10,
      },
      {
        active: false,
        href: "/docs/reference/",
        icon: "braces",
        id: "reference",
        links: [],
        storage_id: "section:/docs/reference/",
        title: "Reference",
        weight: 20,
      },
    ],
  });
});

test("merges configured metadata and links into a generated section", () => {
  const pages = [
    docsPage("/docs/", "Docs", 0),
    docsPage("/docs/guide/", "Guide", 10, "book"),
    docsPage("/docs/guide/install/", "Install", 20, "download"),
  ];
  const configured = [
    {
      id: "guide",
      title: "Start Here",
      icon: "rocket",
      weight: 1,
      links: [
        {
          title: "Install Vara",
          href: "/docs/guide/install",
          new_tab: false,
          weight: 2,
          icon: "package",
        },
        {
          title: "Veta",
          href: "https://veta.varavel.com",
          new_tab: true,
          weight: 3,
          icon: "external-link",
        },
      ],
    },
  ];

  const result = resolveDocsSidebarNavigation(pages, "/docs/", configured, "/docs/guide/install/");
  const section = result.sections[0];

  assert.equal(section.title, "Start Here");
  assert.equal(section.icon, "rocket");
  assert.equal(section.weight, 1);
  assert.equal(section.href, "/docs/guide/");
  assert.equal(section.storage_id, "section:/docs/guide/");
  assert.deepEqual(section.links, [
    {
      active: true,
      external: false,
      href: "/docs/guide/install/",
      icon: "package",
      key: "/docs/guide/install",
      new_tab: false,
      title: "Install Vara",
      weight: 2,
    },
    {
      active: false,
      external: true,
      href: "https://veta.varavel.com",
      icon: "external-link",
      key: "https://veta.varavel.com",
      new_tab: true,
      title: "Veta",
      weight: 3,
    },
  ]);
});

test("creates standalone configured sections and preserves zero weights", () => {
  const pages = [
    docsPage("/docs/", "Docs", 0),
    docsPage("/docs/guide/", "Guide", 10),
  ];
  const configured = [
    {
      id: "community",
      title: "Community",
      icon: "users",
      weight: 0,
      links: [
        { title: "Discussions", href: "/community/", icon: "messages-square", new_tab: false, weight: 0 },
      ],
    },
  ];

  const result = resolveDocsSidebarNavigation(pages, "/docs/", configured, "/community/");

  assert.equal(result.root.title, "Docs");
  assert.deepEqual(result.sections.map(section => section.id), ["community", "guide"]);
  assert.deepEqual(result.sections[0], {
    active: false,
    href: "",
    icon: "users",
    id: "community",
    links: [
      {
        active: true,
        external: false,
        href: "/community/",
        icon: "messages-square",
        key: "/community",
        new_tab: false,
        title: "Discussions",
        weight: 0,
      },
    ],
    storage_id: "custom:community",
    title: "Community",
    weight: 0,
  });
});

test("sorts equal weights deterministically and ignores invalid configuration", () => {
  const configured = [
    { id: "zeta", title: "Zeta", links: [{ title: "Beta", href: "/b" }, { title: "Alpha", href: "/a" }] },
    { id: "alpha", title: "Alpha", weight: "invalid", links: [] },
    { id: "bad id", title: "Bad", links: [] },
    { id: "missing-title", links: [] },
    null,
  ];

  const result = resolveDocsSidebarNavigation([], "/docs/", configured, "");

  assert.deepEqual(result.sections.map(section => section.id), ["alpha", "zeta"]);
  assert.deepEqual(result.sections[1].links.map(link => link.title), ["Alpha", "Beta"]);
  assert.equal(result.sections[1].links[0].icon, "");
  assert.equal(result.sections[1].links[0].new_tab, false);
  assert.equal(result.sections[1].links[0].weight, Number.MAX_SAFE_INTEGER);
});

test("reads pages and the current permalink from the function context", () => {
  const pages = [docsPage("/docs/", "Docs", 0), docsPage("/docs/guide/", "Guide", 1)];

  const result = docsSidebarNavigation(
    { page: { permalink: "/docs/guide/" }, pages },
    "/docs/",
    [],
  );

  assert.equal(result.sections[0].active, true);
});

function docsPage(permalink, title, weight, icon = "", content = "# Content") {
  return { content, icon, permalink, template: "vara-docs", title, weight };
}
