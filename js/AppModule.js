define(["app:AbstractModule", "app:CommonModule", "app:AppComponent", "app:MsdbService", "app:AppModel", 
		"app:AppUtils", "app:EventManager", "app:TranslateManager", "app:ProgressBarDirective", "app:SocketManager", 
		"app:ConnectionManager", "app:LazyManager"], 
function(AbstractModule, CommonModule, AppComponent, MsdbService, AppModel, 
		 AppUtils, EventManager, TranslateManager, ProgressBarDirective, SocketManager, 
		 ConnectionManager, LazyManager) 
{
	ng.core.enableProdMode();

	const AppModule = function ()
	{
		AbstractModule.call(this);
	};
	
	const BootStrapModule = ng.core.NgModule({
		imports:[
			CommonModule,
			ng.platformBrowser.BrowserModule,
			ng.router.RouterModule.forRoot([
				{path: "", redirectTo: "home", pathMatch: "full"},
				{path: "home", loadChildren:() => AppUtils.loadModule("HomeModule")},
				{path: "search", loadChildren:() => AppUtils.loadModule("SearchModule")},
				{path: "detail", loadChildren:() => AppUtils.loadModule("DetailModule")},
				{path: "result", loadChildren:() => AppUtils.loadModule("ResultModule")},
				{path: "mygames", loadChildren:() => AppUtils.loadModule("MyGamesModule")}
			], {useHash:true})
		],
		declarations:[
			AppComponent,
			ProgressBarDirective
		],
		providers:[
			MsdbService,
			AppModel,
			EventManager,
			TranslateManager,
			SocketManager,
			ConnectionManager,
			LazyManager
		],
		bootstrap:[
			AppComponent
		]
	}).Class({
		extends:AbstractModule,
		constructor:AppModule
	});

	ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(BootStrapModule);
});