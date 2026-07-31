import Alpine from "alpinejs";
import { initThemeRuntime } from "../theme/runtime.js";
import { initDocs } from "./docs.js";
import { initShiki } from "./shiki.js";

initThemeRuntime();
initDocs();
initShiki();

window.Alpine = Alpine;
Alpine.start();
