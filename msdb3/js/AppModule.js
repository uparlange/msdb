define(["app:CommonModule", "app:AppComponent", "app:MsdbProvider", "app:AppProvider", "app:AppUtils", "app:EventManager", "app:TranslateManager", "app:ProgressBarDirective", "app:SocketManager"], 
function(CommonModule, AppComponent, MsdbProvider, AppProvider, AppUtils, EventManager, TranslateManager, ProgressBarDirective, SocketManager) 
{
	ng.core.enableProdMode();
	
	const bootstrapModule = function(bUpdate)
	{
		let lastView = localStorage.getItem("MSDB.lastView") || "/home";
		if(lastView === "/update")
		{
			lastView = "/home";
		}
		if(bUpdate)
		{
			lastView = "/update";
		}
		localStorage.setItem("MSDB.lastView", lastView);
		
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
	};
	
	const appCacheEventHandler = function(e)
	{
		switch(e.type)
		{
			case 'error' : // manifest introuvable	
			case 'cached' : // manifest initialisé
			case 'noupdate' : // pas de mise à jour
			case 'obsolete' : // manifest plus disponible
				bootstrapModule(false);
				break;
			case 'updateready' : // mise à jour disponible
				bootstrapModule(true);
				break;
		}
	};

	window.applicationCache.addEventListener('cached', appCacheEventHandler, false);
	window.applicationCache.addEventListener('checking', appCacheEventHandler, false);
	window.applicationCache.addEventListener('downloading', appCacheEventHandler, false);
	window.applicationCache.addEventListener('progress', appCacheEventHandler, false);
	window.applicationCache.addEventListener('error', appCacheEventHandler, false);
	window.applicationCache.addEventListener('updateready', appCacheEventHandler, false);
	window.applicationCache.addEventListener('noupdate', appCacheEventHandler, false);
	window.applicationCache.addEventListener('obsolete', appCacheEventHandler, false);
});