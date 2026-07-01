/**
 * Minimum upward scroll distance before the back-to-top button is shown.
 */
const BACK_TO_TOP_SCROLL_THRESHOLD = 300;

/**
 * Injects anchor links into prose headings that have an id attribute.
 * Each anchor link is placed as the last child of the heading element
 * and becomes visible on heading hover.
 */
function injectAnchorLinks() {
  // Icon by Lucide Icons
  const LINK_SVG =
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

  document
    .querySelectorAll(".prose :is(h1, h2, h3, h4, h5, h6)")
    .forEach((heading) => {
      if (heading.id && !heading.querySelector("a.anchor-link")) {
        const anchor = document.createElement("a");
        anchor.className = "anchor-link";
        anchor.href = `#${heading.id}`;
        anchor.setAttribute("aria-hidden", "true");
        anchor.tabIndex = -1;
        anchor.innerHTML = LINK_SVG;
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const url = new URL(window.location.href);
          url.hash = heading.id;
          history.pushState(null, "", url);
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        heading.append(anchor);
      }
    });
}

/**
 * Highlights the active TOC link based on scroll position.
 *
 * Groups all `.toc-link` elements by their target heading so both mobile and
 * desktop duplicates stay in sync. Uses a scroll listener on the main content
 * area with `requestAnimationFrame` throttling.
 */
function initTocHighlight() {
  const scrollRoot = document.querySelector("main");
  if (!scrollRoot) return;

  const allLinks = document.querySelectorAll(".toc-link");
  if (allLinks.length === 0) return;

  const headings = resolveTocHeadings(allLinks);
  if (headings.size === 0) return;

  const links = Array.from(allLinks);
  let active = null;

  function update() {
    const next = scrollRoot.scrollTop <= 0
      ? null
      : findActiveHeading(headings, scrollRoot.getBoundingClientRect().top);

    if (next === active) return;

    active = next;
    links.forEach((link) => link.classList.remove("text-info"));

    if (next) {
      headings.get(next).forEach((link) => link.classList.add("text-info"));
    }
  }

  let ticking = false;
  scrollRoot.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    }
  }, { passive: true });

  update();
}

/**
 * Builds a map from each heading element to all its TOC link elements.
 *
 * @param {NodeListOf<Element>} links - All `.toc-link` elements.
 * @returns {Map<Element, Element[]>} Heading → links mapping.
 */
function resolveTocHeadings(links) {
  const map = new Map();

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const id = href.slice(href.lastIndexOf("#") + 1);
    const heading = document.getElementById(id);
    if (!heading) return;

    if (!map.has(heading)) map.set(heading, []);
    map.get(heading).push(link);
  });

  return map;
}

/**
 * Finds the heading closest to (but above) the current scroll position.
 *
 * @param {Map<Element, Element[]>} headings - Heading → links map.
 * @param {number} rootTop - The scroll container's top offset on screen.
 * @returns {Element | null} The current active heading, or null.
 */
function findActiveHeading(headings, rootTop) {
  const HEADER_OFFSET = 80;
  let current = null;

  for (const heading of headings.keys()) {
    const top = heading.getBoundingClientRect().top - rootTop;
    if (top <= HEADER_OFFSET) {
      current = heading;
    }
  }

  return current;
}

export async function copyMarkdownFromUrl(markdownUrl, options = {}) {
  const fetcher = options.fetcher ?? globalThis.fetch;
  const clipboard = options.clipboard ?? globalThis.navigator?.clipboard;

  if (!fetcher) {
    throw new Error("Markdown fetch is not available.");
  }

  if (!clipboard?.writeText) {
    throw new Error("Clipboard is not available.");
  }

  const response = await fetcher(markdownUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Markdown content is not available.");
  }

  await clipboard.writeText(await response.text());
}

export function resolveMarkdownCopyUi(status) {
  if (status === "loading") {
    return { disabled: true, icon: "copy", label: "Copying Markdown" };
  }

  if (status === "copied") {
    return { disabled: false, icon: "check", label: "Copied Markdown" };
  }

  if (status === "error") {
    return { disabled: false, icon: "copy", label: "Could not copy" };
  }

  return { disabled: false, icon: "copy", label: "Copy Markdown" };
}

export function resolveBackToTopState({
  currentScrollTop,
  previousScrollTop,
  upwardScrollDistance,
  threshold = BACK_TO_TOP_SCROLL_THRESHOLD,
}) {
  const current = Math.max(0, currentScrollTop);
  const previous = Math.max(0, previousScrollTop);

  if (current <= 0) {
    return {
      showBackToTop: false,
      upwardScrollDistance: 0,
      previousScrollTop: 0,
    };
  }

  if (current > previous) {
    return {
      showBackToTop: false,
      upwardScrollDistance: 0,
      previousScrollTop: current,
    };
  }

  if (current < previous) {
    const nextUpwardScrollDistance = upwardScrollDistance + previous - current;

    return {
      showBackToTop: nextUpwardScrollDistance >= threshold,
      upwardScrollDistance: nextUpwardScrollDistance,
      previousScrollTop: current,
    };
  }

  return {
    showBackToTop: false,
    upwardScrollDistance,
    previousScrollTop: current,
  };
}

export function resolveSidebarGroupOpen(storedValue, hasActiveLink, defaultOpen = true) {
  if (hasActiveLink) return true;
  if (storedValue === "true") return true;
  if (storedValue === "false") return false;

  return defaultOpen;
}

export function shouldCenterSidebarLink(rootRect, linkRect) {
  return linkRect.top < rootRect.top || linkRect.bottom > rootRect.bottom;
}

export function resolveSidebarScrollTop(storedValue) {
  if (storedValue === null) return null;
  if (storedValue.trim() === "") return null;

  const scrollTop = Number(storedValue);

  if (!Number.isFinite(scrollTop) || scrollTop < 0) return null;

  return scrollTop;
}

function registerAlpineVarapressDocs() {
  Alpine.data("varapressSidebarGroup", (id, defaultOpen = true) => ({
    open: true,
    storageKey: `varapress.sidebar.${id}`,

    init() {
      this.open = resolveSidebarGroupOpen(
        this.readStoredOpen(),
        Boolean(this.$el.querySelector("[aria-current=\"page\"]")),
        defaultOpen,
      );
    },

    toggle() {
      this.open = !this.open;
      this.writeStoredOpen();
    },

    readStoredOpen() {
      try {
        return localStorage.getItem(this.storageKey);
      } catch (_error) {
        return null;
      }
    },

    writeStoredOpen() {
      try {
        localStorage.setItem(this.storageKey, this.open ? "true" : "false");
      } catch (_error) {
        // Ignore storage failures so navigation keeps working in restricted browsers.
      }
    },
  }));

  Alpine.data("varapressDocs", () => ({
    /** @type {boolean} Whether the mobile sidebar drawer is open. */
    sidebarOpen: false,

    /** @type {boolean} Whether the mobile TOC panel is open. */
    tocOpen: false,

    /** @type {boolean} Whether the back-to-top button is visible. */
    showBackToTop: false,

    /** @type {"idle" | "loading" | "copied" | "error"} Current Markdown copy status. */
    markdownCopyStatus: "idle",

    get markdownCopyUi() {
      return resolveMarkdownCopyUi(this.markdownCopyStatus);
    },

    backToTopRoot: null,
    backToTopFrame: null,
    backToTopResetTimer: null,
    markdownCopyResetTimer: null,
    backToTopProgrammaticScroll: false,
    sidebarScrollBeforeUnloadReady: false,
    sidebarScrollRoots: {},
    previousScrollTop: 0,
    upwardScrollDistance: 0,

    init() {
      this.backToTopRoot = document.querySelector("main");
      if (!this.backToTopRoot) return;

      this.previousScrollTop = this.backToTopRoot.scrollTop;
      this.backToTopRoot.addEventListener(
        "scroll",
        () => {
          this.queueBackToTopUpdate();
        },
        { passive: true },
      );
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    toggleToc() {
      this.tocOpen = !this.tocOpen;
    },

    initSidebarScroll(root, id) {
      if (!root || root.dataset.varapressSidebarScrollReady === "true") return;

      root.dataset.varapressSidebarScrollReady = "true";

      const storageKey = `varapress.sidebar.scroll.${id}`;
      const savedScrollTop = this.readSidebarScrollTop(storageKey);

      if (savedScrollTop === null) {
        this.scrollActiveSidebarLink(root);
      } else {
        root.scrollTop = savedScrollTop;
      }

      this.sidebarScrollRoots[storageKey] = root;
      this.ensureSidebarScrollBeforeUnload();
    },

    readSidebarScrollTop(storageKey) {
      try {
        return resolveSidebarScrollTop(sessionStorage.getItem(storageKey));
      } catch (_error) {
        return null;
      }
    },

    ensureSidebarScrollBeforeUnload() {
      if (this.sidebarScrollBeforeUnloadReady) return;

      this.sidebarScrollBeforeUnloadReady = true;
      window.addEventListener("beforeunload", () => {
        this.persistSidebarScrollPositions();
      });
    },

    persistSidebarScrollPositions() {
      Object.entries(this.sidebarScrollRoots).forEach(([storageKey, root]) => {
        this.writeSidebarScrollTop(storageKey, root.scrollTop);
      });
    },

    writeSidebarScrollTop(storageKey, scrollTop) {
      try {
        sessionStorage.setItem(storageKey, String(Math.max(0, Math.round(scrollTop))));
      } catch (_error) {
        // Ignore storage failures so navigation keeps working in restricted browsers.
      }
    },

    scrollActiveSidebarLink(root) {
      const activeLink = root?.querySelector("[aria-current=\"page\"]");
      if (!activeLink) return;

      if (!shouldCenterSidebarLink(root.getBoundingClientRect(), activeLink.getBoundingClientRect())) {
        return;
      }

      activeLink.scrollIntoView({ block: "center", inline: "nearest" });
    },

    async copyMarkdown(markdownUrl) {
      if (this.markdownCopyStatus === "loading") return;

      this.markdownCopyStatus = "loading";

      try {
        await copyMarkdownFromUrl(markdownUrl);
        this.markdownCopyStatus = "copied";
      } catch (_error) {
        this.markdownCopyStatus = "error";
      }

      this.resetMarkdownCopyStatusSoon();
    },

    resetMarkdownCopyStatusSoon() {
      if (this.markdownCopyResetTimer) clearTimeout(this.markdownCopyResetTimer);

      this.markdownCopyResetTimer = setTimeout(() => {
        this.markdownCopyStatus = "idle";
      }, 2200);
    },

    queueBackToTopUpdate() {
      if (this.backToTopFrame) return;

      this.backToTopFrame = requestAnimationFrame(() => {
        this.backToTopFrame = null;
        this.updateBackToTop();
      });
    },

    updateBackToTop() {
      if (!this.backToTopRoot) return;

      const currentScrollTop = this.backToTopRoot.scrollTop;

      if (this.backToTopProgrammaticScroll) {
        this.showBackToTop = false;
        this.upwardScrollDistance = 0;
        this.previousScrollTop = currentScrollTop;
        if (currentScrollTop <= 0) this.backToTopProgrammaticScroll = false;
        return;
      }

      const state = resolveBackToTopState({
        currentScrollTop,
        previousScrollTop: this.previousScrollTop,
        upwardScrollDistance: this.upwardScrollDistance,
      });

      this.showBackToTop = state.showBackToTop;
      this.upwardScrollDistance = state.upwardScrollDistance;
      this.previousScrollTop = state.previousScrollTop;
    },

    scrollMainToTop() {
      if (!this.backToTopRoot) return;

      this.showBackToTop = false;
      this.upwardScrollDistance = 0;
      this.previousScrollTop = this.backToTopRoot.scrollTop;
      this.backToTopProgrammaticScroll = true;

      if (this.backToTopResetTimer) clearTimeout(this.backToTopResetTimer);
      this.backToTopResetTimer = setTimeout(() => {
        this.backToTopProgrammaticScroll = false;
        this.previousScrollTop = this.backToTopRoot
          ? this.backToTopRoot.scrollTop
          : 0;
      }, 800);

      this.backToTopRoot.scrollTo({ top: 0, behavior: "smooth" });
    },
  }));
}

export function initDocs() {
  injectAnchorLinks();
  initTocHighlight();
  document.addEventListener("alpine:init", () => {
    registerAlpineVarapressDocs();
  });
}
