import AppUtils from "./AppUtils.js";
import AppModule from "./AppModule.js";

// Check that service workers are registered
if ("serviceWorker" in navigator) {
	// Use the window load event to keep the page load performant
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/swa.js");
	});
}

if (AppUtils.productionMode()) {
	ng.core.enableProdMode();
}

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);