/**
 * Minimum upward scroll distance before the back-to-top button is shown.
 */
const BACK_TO_TOP_SCROLL_THRESHOLD = 300;

/**
 * Shared sidebar scroll storage so position survives navigation between pages.
 */
const SIDEBAR_SCROLL_STORAGE_KEY = "varapress.sidebar.scroll";

export function slugifyTocHeading(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

export function resolveTableOfContents(headings) {
  const items = Array.from(headings || []);
  const usedIds = new Set(items.map(heading => String(heading.id || "").trim()).filter(Boolean));

  for (const heading of items) {
    if (!heading.id) {
      const baseId = slugifyTocHeading(heading.textContent);
      let id = baseId;
      let suffix = 2;

      while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
      heading.id = id;
      usedIds.add(id);
    }
  }

  return items
    .filter(heading => heading.tagName === "H2" || heading.tagName === "H3")
    .map(heading => ({
      id: heading.id,
      level: Number(heading.tagName.slice(1)),
      title: String(heading.textContent || "").trim(),
    }))
    .filter(item => item.title);
}

export function resolveHashId(hash) {
  const value = String(hash || "");
  if (!value.startsWith("#") || value.length === 1) return "";

  try {
    return decodeURIComponent(value.slice(1));
  } catch (_error) {
    return value.slice(1);
  }
}

export function scrollToHash(hash, options = {}) {
  const documentRef = options.document ?? globalThis.document;
  const id = resolveHashId(hash);
  const heading = id ? documentRef?.getElementById(id) : null;
  if (!heading) return false;

  const scroll = () => heading.scrollIntoView({ behavior: "smooth", block: "start" });
  if (options.defer) {
    const requestFrame = options.requestAnimationFrame ?? globalThis.requestAnimationFrame;
    requestFrame(scroll);
  } else {
    scroll();
  }

  return true;
}

function navigateToHeading(id) {
  const url = new URL(window.location.href);
  url.hash = id;
  history.pushState(null, "", url);
  return scrollToHash(url.hash);
}

/**
 * Returns whether an element lives in (or is) a `.not-prose` subtree.
 *
 * Prose-level features such as anchor links and table-of-contents entries
 * must skip those elements so opt-out content stays untouched.
 *
 * @param {Element | null} element - The element to check.
 * @returns {boolean} True when the element is inside a `.not-prose` subtree.
 */
export function isInsideNotProse(element) {
  return Boolean(element?.closest(".not-prose"));
}

function initTableOfContents() {
  const headings = Array.from(
    document.querySelectorAll(".prose :is(h1, h2, h3, h4, h5, h6)"),
  ).filter((heading) => !isInsideNotProse(heading));
  const items = resolveTableOfContents(headings);
  if (items.length === 0) return false;

  document.querySelectorAll("[data-toc-links]").forEach((nav) => {
    const isMobile = nav.dataset.tocLinks === "mobile";

    for (const item of items) {
      const link = document.createElement("a");
      link.href = `#${item.id}`;
      link.className = `block py-0.5 text-sm text-content-muted transition-colors hover:text-content toc-link${
        item.level === 3 ? " pl-3" : ""
      }`;
      link.textContent = item.title;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        navigateToHeading(item.id);
      });
      if (isMobile) link.setAttribute("x-on:click", "tocOpen = false");
      nav.append(link);
    }
  });

  return true;
}

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
      if (isInsideNotProse(heading)) return;
      if (heading.id && !heading.querySelector("a.anchor-link")) {
        const anchor = document.createElement("a");
        anchor.className = "anchor-link";
        anchor.href = `#${heading.id}`;
        anchor.setAttribute("aria-hidden", "true");
        anchor.tabIndex = -1;
        anchor.innerHTML = LINK_SVG;
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          navigateToHeading(heading.id);
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

export function resolvePromptCopyUi(status) {
  if (status === "loading") {
    return { disabled: true, icon: "copy", label: "Copying Prompt" };
  }

  if (status === "copied") {
    return { disabled: false, icon: "check", label: "Prompt Copied" };
  }

  if (status === "error") {
    return { disabled: false, icon: "copy", label: "Could not copy" };
  }

  return { disabled: false, icon: "copy", label: "Copy Prompt" };
}

const ASK_AI_PROVIDER_URLS = {
  chatgpt: "https://chatgpt.com/?q=",
  claude: "https://claude.ai/new?q=",
  deepseek: "https://chat.deepseek.com/?q=",
  grok: "https://grok.com/?q=",
  perplexity: "https://www.perplexity.ai/search/new?q=",
};

export function resolveAskAiPrompt(markdownUrl, baseUrl = globalThis.location?.href) {
  const absoluteMarkdownUrl = new URL(markdownUrl, baseUrl).href;
  return `Read ${absoluteMarkdownUrl} and get ready to answer my questions about it`;
}

export function resolveAskAiUrl(provider, markdownUrl, baseUrl = globalThis.location?.href) {
  const providerUrl = ASK_AI_PROVIDER_URLS[provider];
  if (!providerUrl) throw new Error(`Unknown AI provider: ${provider}`);

  return providerUrl + encodeURIComponent(resolveAskAiPrompt(markdownUrl, baseUrl));
}

export async function copyAskAiPromptToClipboard(markdownUrl, options = {}) {
  const clipboard = options.clipboard ?? globalThis.navigator?.clipboard;
  if (!clipboard?.writeText) throw new Error("Clipboard is not available.");

  await clipboard.writeText(resolveAskAiPrompt(markdownUrl, options.baseUrl));
}

export function resolveBackToTopState({
  currentScrollTop,
  previousScrollTop,
  upwardScrollDistance,
  threshold = BACK_TO_TOP_SCROLL_THRESHOLD,
  programmaticScroll = false,
}) {
  const current = Math.max(0, currentScrollTop);
  const previous = Math.max(0, previousScrollTop);

  if (programmaticScroll) {
    const reachedTop = current <= 0;
    const scrolledDown = current > previous;

    return {
      showBackToTop: false,
      upwardScrollDistance: 0,
      previousScrollTop: current,
      programmaticScroll: !(reachedTop || scrolledDown),
    };
  }

  if (current <= 0) {
    return {
      showBackToTop: false,
      upwardScrollDistance: 0,
      previousScrollTop: 0,
      programmaticScroll: false,
    };
  }

  if (current > previous) {
    return {
      showBackToTop: false,
      upwardScrollDistance: 0,
      previousScrollTop: current,
      programmaticScroll: false,
    };
  }

  if (current < previous) {
    const nextUpwardScrollDistance = upwardScrollDistance + previous - current;

    return {
      showBackToTop: nextUpwardScrollDistance >= threshold,
      upwardScrollDistance: nextUpwardScrollDistance,
      previousScrollTop: current,
      programmaticScroll: false,
    };
  }

  return {
    showBackToTop: false,
    upwardScrollDistance,
    previousScrollTop: current,
    programmaticScroll: false,
  };
}

export function resolveSidebarGroupOpen(storedValue, hasActiveLink, defaultOpen = true, openActiveGroup = true) {
  if (openActiveGroup && hasActiveLink) return true;
  if (storedValue === "true") return true;
  if (storedValue === "false") return false;

  return defaultOpen;
}

export function isSidebarLinkOutOfView(rootRect, linkRect) {
  return linkRect.top > rootRect.bottom || linkRect.bottom < rootRect.top;
}

export function resolveSidebarScrollTop(storedValue) {
  if (storedValue === null) return null;
  if (storedValue.trim() === "") return null;

  const scrollTop = Number(storedValue);

  if (!Number.isFinite(scrollTop) || scrollTop < 0) return null;

  return scrollTop;
}

function initHashNavigation() {
  scrollToHash(location.hash, { defer: true });
  window.addEventListener("hashchange", () => scrollToHash(location.hash));
}

function registerAlpineVarapressDocs(tocAvailable) {
  Alpine.data("varapressSidebarGroup", (id, collapsedByDefault = false) => ({
    open: !collapsedByDefault,
    storageKey: `varapress.sidebar.${id}`,

    init() {
      this.open = resolveSidebarGroupOpen(
        this.readStoredOpen(),
        Boolean(this.$el.querySelector("[aria-current=\"page\"]")),
        !collapsedByDefault,
        !collapsedByDefault,
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

    /** @type {boolean} Whether this page has entries for the table of contents. */
    tocAvailable,

    /** @type {boolean} Whether the back-to-top button is visible. */
    showBackToTop: false,

    /** @type {"idle" | "loading" | "copied" | "error"} Current Markdown copy status. */
    markdownCopyStatus: "idle",

    /** @type {"idle" | "loading" | "copied" | "error"} Current prompt copy status. */
    promptCopyStatus: "idle",

    get markdownCopyUi() {
      return resolveMarkdownCopyUi(this.markdownCopyStatus);
    },

    get promptCopyUi() {
      return resolvePromptCopyUi(this.promptCopyStatus);
    },

    backToTopRoot: null,
    backToTopFrame: null,
    markdownCopyResetTimer: null,
    promptCopyResetTimer: null,
    backToTopProgrammaticScroll: false,
    sidebarScrollBeforeUnloadReady: false,
    sidebarScrollRoot: null,
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

    initSidebarScroll(root) {
      if (!root || root.dataset.varapressSidebarScrollReady === "true") return;

      root.dataset.varapressSidebarScrollReady = "true";

      const savedScrollTop = this.readSidebarScrollTop(SIDEBAR_SCROLL_STORAGE_KEY);

      if (savedScrollTop === null) {
        this.scrollActiveSidebarLink(root);
      } else {
        root.scrollTop = savedScrollTop;
      }

      this.sidebarScrollRoot = root;
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
      if (this.sidebarScrollRoot) {
        this.writeSidebarScrollTop(SIDEBAR_SCROLL_STORAGE_KEY, this.sidebarScrollRoot.scrollTop);
      }
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

      if (!isSidebarLinkOutOfView(root.getBoundingClientRect(), activeLink.getBoundingClientRect())) {
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

    askAiUrl(provider, markdownUrl) {
      return resolveAskAiUrl(provider, markdownUrl);
    },

    async copyAskAiPrompt(markdownUrl) {
      if (this.promptCopyStatus === "loading") return;

      this.promptCopyStatus = "loading";

      try {
        await copyAskAiPromptToClipboard(markdownUrl);
        this.promptCopyStatus = "copied";
      } catch (_error) {
        this.promptCopyStatus = "error";
      }

      this.resetPromptCopyStatusSoon();
    },

    resetMarkdownCopyStatusSoon() {
      if (this.markdownCopyResetTimer) clearTimeout(this.markdownCopyResetTimer);

      this.markdownCopyResetTimer = setTimeout(() => {
        this.markdownCopyStatus = "idle";
      }, 2200);
    },

    resetPromptCopyStatusSoon() {
      if (this.promptCopyResetTimer) clearTimeout(this.promptCopyResetTimer);

      this.promptCopyResetTimer = setTimeout(() => {
        this.promptCopyStatus = "idle";
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

      const state = resolveBackToTopState({
        currentScrollTop: this.backToTopRoot.scrollTop,
        previousScrollTop: this.previousScrollTop,
        upwardScrollDistance: this.upwardScrollDistance,
        programmaticScroll: this.backToTopProgrammaticScroll,
      });

      this.backToTopProgrammaticScroll = state.programmaticScroll;
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

      this.backToTopRoot.scrollTo({ top: 0, behavior: "smooth" });
    },
  }));
}

export function initDocs() {
  const tocAvailable = initTableOfContents();
  injectAnchorLinks();
  initTocHighlight();
  initHashNavigation();
  document.addEventListener("alpine:init", () => {
    registerAlpineVarapressDocs(tocAvailable);
  });
}
