import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import AppView from "./AppView.js";
import AppModel from "./AppModel.js";
import ProgressBarDirective from "./ProgressBarDirective.js";
import GlobalModule from "./GlobalModule.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function AppModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				CommonModule,
				GlobalModule,
				ng.common.http.HttpClientModule,
				ng.platformBrowser.BrowserModule,
				ng.platformBrowser.animations.BrowserAnimationsModule,
				ng.router.RouterModule.forRoot([
					{ path: "", redirectTo: "home", pathMatch: "full" },
					{ path: "home", loadChildren: AppUtils.loadModule("HomeModule") },
					{ path: "search", loadChildren: AppUtils.loadModule("SearchModule") },
					{ path: "detail", loadChildren: AppUtils.loadModule("DetailModule") },
					{ path: "result", loadChildren: AppUtils.loadModule("ResultModule") },
					{ path: "mygames", loadChildren: AppUtils.loadModule("MyGamesModule") },
					{ path: "config", loadChildren: AppUtils.loadModule("ConfigModule") },
					{ path: "bot", loadChildren: AppUtils.loadModule("BotModule") }
				], { useHash: true })
			],
			declarations: [
				AppView,
				ProgressBarDirective
			],
			providers: [
				AppModel
			],
			bootstrap: [
				AppView
			]
		})
	]
});