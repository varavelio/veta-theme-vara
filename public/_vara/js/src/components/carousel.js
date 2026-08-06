/**
 * Generic carousel behavior for `vara-carousel`.
 *
 * The track is a scroll container whose direct children are slides. Slide
 * width is derived from the layout instead of hard-coded, so the same logic
 * works with any content and any slides-per-view configuration.
 */

export function clampIndex(index, count) {
  if (!Number.isFinite(count) || count <= 0) return 0;
  if (!Number.isFinite(index)) return 0;
  return Math.max(0, Math.min(Math.round(index), count - 1));
}

export function resolveStep(track) {
  if (!track) return 0;
  const children = track.children;
  if (!children || children.length === 0) return 0;
  if (children.length > 1) {
    return Math.max(0, children[1].offsetLeft - children[0].offsetLeft);
  }
  return Math.max(0, children[0].offsetWidth);
}

export function resolveActiveIndex(scrollLeft, step, count) {
  if (!Number.isFinite(scrollLeft) || !step || step <= 0) return 0;
  return clampIndex(scrollLeft / step, count);
}

export function registerVaraCarousel() {
  document.addEventListener("alpine:init", () => {
    Alpine.data("varaCarousel", () => ({
      slides: 0,
      index: 0,
      init() {
        const track = this.$refs.track;
        this.slides = track ? track.children.length : 0;
      },
      step() {
        return resolveStep(this.$refs.track);
      },
      onScroll() {
        const track = this.$refs.track;
        if (!track) return;
        this.index = resolveActiveIndex(track.scrollLeft, this.step(), this.slides);
      },
      scrollTo(index) {
        const track = this.$refs.track;
        if (!track) return;
        const target = clampIndex(index, this.slides);
        track.scrollTo({ left: target * this.step(), behavior: "smooth" });
        this.index = target;
      },
      prev() {
        this.scrollTo(this.index - 1);
      },
      next() {
        this.scrollTo(this.index + 1);
      },
    }));
  });
}
