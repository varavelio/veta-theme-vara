import Alpine from "alpinejs";
import { registerVaraCarousel } from "../components/carousel.js";
import { initThemeRuntime } from "../theme/runtime.js";

initThemeRuntime();
registerVaraCarousel();

window.Alpine = Alpine;
Alpine.start();
