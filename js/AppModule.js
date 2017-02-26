define(["AbstractModule", "CommonModule", "AppView", "MsdbService", "AppModel", 
		"AppUtils", "EventManager", "TranslateManager", "ProgressBarDirective", "SocketManager", 
		"ConnectionManager", "LazyManager", "CacheManager", "UpdateManager", "RouterManager",
		"WindowRef"], 
function(AbstractModule, CommonModule, AppView, MsdbService, AppModel, 
		AppUtils, EventManager, TranslateManager, ProgressBarDirective, SocketManager, 
		ConnectionManager, LazyManager, CacheManager, UpdateManager, RouterManager,
		WindowRef) 
{
	if(GlobalConfig.PRODUCTION)
	{
		ng.core.enableProdMode();
	}

	ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(
		ng.core.NgModule({
			imports:[
				CommonModule,
				ng.platformBrowser.BrowserModule,
				ng.platformBrowser.animations.BrowserAnimationsModule,
				ng.router.RouterModule.forRoot([
					{path: "", redirectTo: "home", pathMatch: "full"},
					{path: "home", loadChildren:AppUtils.getModuleName("HomeModule")},
					{path: "search", loadChildren:AppUtils.getModuleName("SearchModule")},
					{path: "detail", loadChildren:AppUtils.getModuleName("DetailModule")},
					{path: "result", loadChildren:AppUtils.getModuleName("ResultModule")},
					{path: "mygames", loadChildren:AppUtils.getModuleName("MyGamesModule")},
					{path: "config", loadChildren:AppUtils.getModuleName("ConfigModule")},
					{path: "bot", loadChildren:AppUtils.getModuleName("BotModule")}
				], {useHash:true})
			],
			declarations:[
				AppView,
				ProgressBarDirective
			],
			providers:[
				MsdbService,
				AppModel,
				EventManager,
				TranslateManager,
				SocketManager,
				ConnectionManager,
				LazyManager,
				CacheManager,
				UpdateManager,
				RouterManager,
				WindowRef
			],
			bootstrap:[
				AppView
			]
		}).Class({
			extends:AbstractModule,
			constructor:[
				function AppModule ()
				{
					AbstractModule.call(this);
				}
			]
		})
	);
});