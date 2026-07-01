import assert from "node:assert/strict";
import test from "node:test";

import {
  copyMarkdownFromUrl,
  resolveBackToTopState,
  resolveMarkdownCopyUi,
  resolveSidebarGroupOpen,
  resolveSidebarScrollTop,
  shouldCenterSidebarLink,
} from "./docs.js";

test("keeps back-to-top hidden for short upward scrolls", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 450,
    previousScrollTop: 700,
    upwardScrollDistance: 0,
  });

  assert.equal(state.showBackToTop, false);
  assert.equal(state.upwardScrollDistance, 250);
  assert.equal(state.previousScrollTop, 450);
});

test("shows back-to-top after scrolling upward by at least 300px", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 400,
    previousScrollTop: 700,
    upwardScrollDistance: 0,
  });

  assert.equal(state.showBackToTop, true);
  assert.equal(state.upwardScrollDistance, 300);
  assert.equal(state.previousScrollTop, 400);
});

test("resets back-to-top visibility when scrolling down", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 430,
    previousScrollTop: 400,
    upwardScrollDistance: 320,
  });

  assert.equal(state.showBackToTop, false);
  assert.equal(state.upwardScrollDistance, 0);
  assert.equal(state.previousScrollTop, 430);
});

test("hides back-to-top at the top of the main scroll container", () => {
  const state = resolveBackToTopState({
    currentScrollTop: 0,
    previousScrollTop: 120,
    upwardScrollDistance: 320,
  });

  assert.equal(state.showBackToTop, false);
  assert.equal(state.upwardScrollDistance, 0);
  assert.equal(state.previousScrollTop, 0);
});

test("fetches markdown on demand and writes it to the clipboard", async () => {
  let fetchOptions;
  const clipboard = {
    text: "",
    async writeText(value) {
      this.text = value;
    },
  };

  await copyMarkdownFromUrl("/docs/page/index.md", {
    clipboard,
    async fetcher(url, options) {
      assert.equal(url, "/docs/page/index.md");
      fetchOptions = options;

      return {
        ok: true,
        async text() {
          return "# Page";
        },
      };
    },
  });

  assert.deepEqual(fetchOptions, { cache: "no-store" });
  assert.equal(clipboard.text, "# Page");
});

test("rejects unavailable markdown without touching the clipboard", async () => {
  const clipboard = {
    async writeText() {
      assert.fail("clipboard should not be written when markdown fetch fails");
    },
  };

  await assert.rejects(
    () =>
      copyMarkdownFromUrl("/missing/index.md", {
        clipboard,
        async fetcher() {
          return { ok: false, status: 404 };
        },
      }),
    /Markdown content is not available/,
  );
});

test("shows a check icon after markdown is copied", () => {
  assert.deepEqual(resolveMarkdownCopyUi("copied"), {
    disabled: false,
    icon: "check",
    label: "Copied Markdown",
  });
});

test("restores a closed sidebar group from storage", () => {
  assert.equal(resolveSidebarGroupOpen("false", false), false);
});

test("restores an open sidebar group from storage", () => {
  assert.equal(resolveSidebarGroupOpen("true", false, false), true);
});

test("opens a sidebar group that contains the active page", () => {
  assert.equal(resolveSidebarGroupOpen("false", true, false), true);
});

test("uses the configured sidebar group default when no storage exists", () => {
  assert.equal(resolveSidebarGroupOpen(null, false), true);
  assert.equal(resolveSidebarGroupOpen(null, false, false), false);
  assert.equal(resolveSidebarGroupOpen(null, false, true), true);
});

test("restores a valid sidebar scroll position from storage", () => {
  assert.equal(resolveSidebarScrollTop("240"), 240);
  assert.equal(resolveSidebarScrollTop("0"), 0);
});

test("ignores unavailable or invalid sidebar scroll positions", () => {
  assert.equal(resolveSidebarScrollTop(null), null);
  assert.equal(resolveSidebarScrollTop(""), null);
  assert.equal(resolveSidebarScrollTop("-1"), null);
  assert.equal(resolveSidebarScrollTop("12px"), null);
});

test("does not center an already visible sidebar link", () => {
  assert.equal(
    shouldCenterSidebarLink(
      { top: 100, bottom: 500 },
      { top: 180, bottom: 220 },
    ),
    false,
  );
});

test("centers a sidebar link outside the visible sidebar area", () => {
  assert.equal(
    shouldCenterSidebarLink(
      { top: 100, bottom: 500 },
      { top: 520, bottom: 560 },
    ),
    true,
  );
});
