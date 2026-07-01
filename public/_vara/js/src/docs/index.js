import Alpine from "alpinejs";
import { initThemeRuntime } from "../theme/runtime.js";
import { initDocs } from "./docs.js";

initThemeRuntime();
initDocs();

window.Alpine = Alpine;
Alpine.start();
