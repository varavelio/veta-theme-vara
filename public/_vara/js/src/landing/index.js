import Alpine from "alpinejs";
import { initThemeRuntime } from "../theme/runtime.js";

initThemeRuntime();

window.Alpine = Alpine;
Alpine.start();
