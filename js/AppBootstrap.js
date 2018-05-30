import AppUtils from "./AppUtils.js";
import AppModule from "./AppModule.js";

if (AppUtils.productionMode()) {
	ng.core.enableProdMode();
}

ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);