import Alpine from "alpinejs";
import { registerVaraCarousel } from "../components/carousel.js";
import { registerVaraFaq } from "../components/faq.js";
import { initThemeRuntime } from "../theme/runtime.js";

initThemeRuntime();
registerVaraCarousel();
registerVaraFaq();

window.Alpine = Alpine;
Alpine.start();
