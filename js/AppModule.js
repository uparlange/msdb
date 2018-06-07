import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import AppView from "./AppView.js";
import AppModel from "./AppModel.js";
import ProgressBarDirective from "./ProgressBarDirective.js";
import GlobalModule from "./GlobalModule.js";

class AppModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				GlobalModule,
				ng.common.http.HttpClientModule,
				ng.platformBrowser.BrowserModule,
				ng.platformBrowser.animations.BrowserAnimationsModule,
				ng.router.RouterModule.forRoot([
					{ path: "", redirectTo: "home", pathMatch: "full" },
					{ path: "home", loadChildren: this.getLazyModule("HomeModule") },
					{ path: "search", loadChildren: this.getLazyModule("SearchModule") },
					{ path: "detail", loadChildren: this.getLazyModule("DetailModule") },
					{ path: "result", loadChildren: this.getLazyModule("ResultModule") },
					{ path: "mygames", loadChildren: this.getLazyModule("MyGamesModule") },
					{ path: "config", loadChildren: this.getLazyModule("ConfigModule") },
					{ path: "bot", loadChildren: this.getLazyModule("BotModule") }
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
		});
	}
	constructor() {
		super();
	}
}

export default AppModule;