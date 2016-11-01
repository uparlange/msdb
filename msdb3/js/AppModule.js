define(["app:CommonModule", "app:AppComponent", "app:MsdbProvider", "app:AppProvider", "app:AppUtils", "app:EventManager", "app:TranslateManager", "app:ProgressBarDirective", "app:SocketManager"], 
function(CommonModule, AppComponent, MsdbProvider, AppProvider, AppUtils, EventManager, TranslateManager, ProgressBarDirective, SocketManager) 
{
	ng.core.enableProdMode();

	const routes = [
		{path: "", redirectTo: "home", pathMatch: "full"},
		{path: "update", loadChildren:() => AppUtils.loadModule("UpdateModule")},
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
			MsdbProvider,
			AppProvider,
			EventManager,
			TranslateManager,
			SocketManager
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