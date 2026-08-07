import Alpine from "alpinejs";
import { registerVaraCarousel } from "../components/carousel.js";
import { registerVaraFaq } from "../components/faq.js";
import { initThemeRuntime } from "../theme/runtime.js";
import { initDocs } from "./docs.js";
import { initShiki } from "./shiki.js";

initThemeRuntime();
registerVaraCarousel();
registerVaraFaq();
initDocs();
initShiki();

window.Alpine = Alpine;
Alpine.start();
