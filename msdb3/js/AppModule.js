define(["CommonModule", "AppComponent", "MsdbProvider", "AppProvider", "AppUtils", "EventManager", "TranslateManager", "ProgressBarDirective"], 
function(CommonModule, AppComponent, MsdbProvider, AppProvider, AppUtils, EventManager, TranslateManager, ProgressBarDirective) 
{
	const routes = [
		{path: "", redirectTo: "home", pathMatch: "full"},
		{path: "home", loadChildren:() => AppUtils.loadModule("HomeModule")},
		{path: "search", loadChildren:() => AppUtils.loadModule("SearchModule")},
		{path: "detail", loadChildren:() => AppUtils.loadModule("DetailModule")},
		{path: "result", loadChildren:() => AppUtils.loadModule("ResultModule")}
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
			TranslateManager
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