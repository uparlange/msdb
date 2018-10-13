import AppUtils from "./AppUtils.js";
import AppModule from "./AppModule.js";

window.addEventListener("load", function () {
	window.navigator.serviceWorker.register("/swa.js").then(function (reg) {
		reg.onupdatefound = function () {
			var installingWorker = reg.installing;
			installingWorker.onstatechange = function () {
				switch (installingWorker.state) {
					case "installed":
						if (window.navigator.serviceWorker.controller) {
							window.location.reload();
						} else {
							// Content is now available offline
						}
						break;
					case "redundant":
						// The installing service worker became redundant"
						break;
				}
			};
		};
	}).catch(function () {
		// Error during service worker registration
	});
});

if (AppUtils.productionMode()) {
	ng.core.enableProdMode();
}

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);