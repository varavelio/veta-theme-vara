/**
 * @typedef {"light" | "dark" | "system"} ThemePreference
 * User-selected theme preference. `system` follows the operating system color scheme.
 */

/**
 * @typedef {"light" | "dark"} ResolvedTheme
 * Concrete theme currently applied to the document.
 */

/**
 * Registers the Alpine.js `theme` component used by theme toggle controls.
 *
 * The component delegates all persistence and DOM mutation to
 * `window.__varaTheme`, which is created by the synchronous theme
 * bootstrapper before Alpine starts. This keeps UI controls reactive without
 * duplicating FOUC-prevention logic.
 *
 * @returns {void}
 */
function registerAlpineTheme() {
  Alpine.data("theme", () => ({
    /** @type {ThemePreference} Current user-selected theme preference. */
    theme: "system",

    /** @type {ResolvedTheme} Concrete theme currently applied to the page. */
    resolvedTheme: "light",

    /**
     * Initializes the component from the global theme runtime and keeps it in
     * sync with future theme changes from other controls, OS changes, or tabs.
     *
     * @returns {void}
     */
    init() {
      if (window.__varaTheme) {
        const state = window.__varaTheme.get();
        this.theme = state.theme;
        this.resolvedTheme = state.resolved;
      }
      window.addEventListener("vara-theme-change", (e) => {
        this.theme = e.detail.theme;
        this.resolvedTheme = e.detail.resolved;
      });
    },

    /**
     * Advances the user preference through light, dark, and system modes.
     *
     * The global runtime applies the resolved document theme, persists the
     * preference, and emits the event that updates this component state.
     *
     * @returns {void}
     */
    cycleTheme() {
      const cycle = { light: "dark", dark: "system", system: "light" };
      const next = cycle[this.theme] || "system";
      if (window.__varaTheme) window.__varaTheme.set(next);
    },

    // TODO: Add setLightTheme, setDarkTheme, setSystemTheme

    /**
     * Human-readable label for the current theme preference.
     *
     * @returns {string}
     */
    get themeLabel() {
      return this.theme.charAt(0).toUpperCase() + this.theme.slice(1);
    },
  }));
}

/**
 * Hooks theme component registration into Alpine's initialization lifecycle.
 *
 * @returns {void}
 */
export function initThemeRuntime() {
  document.addEventListener("alpine:init", () => {
    registerAlpineTheme();
  });
}
