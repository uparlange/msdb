define(["AppUtils", "AbstractModule", "CommonModule", "AppView", "AppModel",
	"ProgressBarDirective", "GlobalModule"],
	function (AppUtils, AbstractModule, CommonModule, AppView, AppModel,
		ProgressBarDirective, GlobalModule) {
		if (GlobalConfig.PRODUCTION) {
			ng.core.enableProdMode();
		}
		ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppUtils.getClass({
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
							{ path: "home", loadChildren: AppUtils.getLazyModuleName("HomeModule") },
							{ path: "search", loadChildren: AppUtils.getLazyModuleName("SearchModule") },
							{ path: "detail", loadChildren: AppUtils.getLazyModuleName("DetailModule") },
							{ path: "result", loadChildren: AppUtils.getLazyModuleName("ResultModule") },
							{ path: "mygames", loadChildren: AppUtils.getLazyModuleName("MyGamesModule") },
							{ path: "config", loadChildren: AppUtils.getLazyModuleName("ConfigModule") },
							{ path: "bot", loadChildren: AppUtils.getLazyModuleName("BotModule") }
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
		}));
	}
);