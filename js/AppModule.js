define(["app:AbstractModule", "app:CommonModule", "app:AppView", "app:MsdbService", "app:AppModel", 
		"app:AppUtils", "app:EventManager", "app:TranslateManager", "app:ProgressBarDirective", "app:SocketManager", 
		"app:ConnectionManager", "app:LazyManager", "app:CacheManager", "app:UpdateManager", "app:RouterManager"], 
function(AbstractModule, CommonModule, AppView, MsdbService, AppModel, 
		 AppUtils, EventManager, TranslateManager, ProgressBarDirective, SocketManager, 
		 ConnectionManager, LazyManager, CacheManager, UpdateManager, RouterManager) 
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
				ng.router.RouterModule.forRoot([
					{path: "", redirectTo: "home", pathMatch: "full"},
					{path: "home", loadChildren:AppUtils.getModuleName("HomeModule")},
					{path: "search", loadChildren:AppUtils.getModuleName("SearchModule")},
					{path: "detail", loadChildren:AppUtils.getModuleName("DetailModule")},
					{path: "result", loadChildren:AppUtils.getModuleName("ResultModule")},
					{path: "mygames", loadChildren:AppUtils.getModuleName("MyGamesModule")}
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
				RouterManager
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