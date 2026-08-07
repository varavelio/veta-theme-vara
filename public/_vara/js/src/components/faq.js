/**
 * Accordion behavior for `vara-faq`.
 *
 * The wrapper owns the open state so at most one `vara-faq-item` is open at
 * a time. Items toggle against that shared state through the parent scope.
 */

export function toggleFaqOpenItem(openItem, id) {
  return openItem === id ? null : id;
}

export function resolveFaqInitialOpen(openFirst, firstItemId) {
  return openFirst === "true" && firstItemId ? firstItemId : null;
}

export function registerVaraFaq() {
  document.addEventListener("alpine:init", () => {
    Alpine.data("varapressFaq", (openFirst = "false") => ({
      openItem: null,

      init() {
        const firstItem = this.$root?.querySelector("[data-vara-faq-item]");
        this.openItem = resolveFaqInitialOpen(openFirst, firstItem?.dataset.varaFaqItem);
      },

      toggle(id) {
        this.openItem = toggleFaqOpenItem(this.openItem, id);
      },
    }));
  });
}
