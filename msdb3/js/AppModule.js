define(["app:CommonModule", "app:AppComponent", "app:MsdbService", "app:AppModel", "app:AppUtils", 
		"app:EventManager", "app:TranslateManager", "app:ProgressBarDirective", "app:SocketManager", "app:ConnectionManager"], 
function(CommonModule, AppComponent, MsdbService, AppModel, AppUtils, 
		 EventManager, TranslateManager, ProgressBarDirective, SocketManager, ConnectionManager) 
{
	ng.core.enableProdMode();

	const routes = [
		{path: "", redirectTo: "home", pathMatch: "full"},
		{path: "home", loadChildren:() => AppUtils.loadModule("HomeModule")},
		{path: "search", loadChildren:() => AppUtils.loadModule("SearchModule")},
		{path: "detail", loadChildren:() => AppUtils.loadModule("DetailModule")},
		{path: "result", loadChildren:() => AppUtils.loadModule("ResultModule")},
		{path: "mygames", loadChildren:() => AppUtils.loadModule("MyGamesModule")}
	];
	
	const AppModule = ng.core.NgModule({
		imports:[
			CommonModule,
			ng.platformBrowser.BrowserModule,
			ng.router.RouterModule.forRoot(routes, {useHash:true})
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
			ConnectionManager
		],
		bootstrap:[
			AppComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});

	ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule);
});